import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { valueToEstree } from 'estree-util-value-to-estree';
import fs from 'fast-glob';
import type { Root } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import type { MdxjsEsm, MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import path from 'path';
import { ComponentDoc, PropItem, withCustomConfig } from 'react-docgen-typescript';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

type RemarkMdxDocgenOptions = {
  sourceRootPath: string;
  propsTablesName?: string;
  sourcePathName?: string;
};

export const remarkMdxDocgen: Plugin<[RemarkMdxDocgenOptions]> = (options) => {
  const propsTablesName = options.propsTablesName || 'propsTables';
  const sourcePathName = options.sourcePathName || 'sourcePath';

  if (!isIdentifierName(propsTablesName)) {
    throw new Error(`Invalid name for an identifier: ${propsTablesName}`);
  }

  if (!isIdentifierName(sourcePathName)) {
    throw new Error(`Invalid name for an identifier: ${sourcePathName}`);
  }

  if (!options?.sourceRootPath) {
    throw new Error(`Please set sourceRootPath.`);
  }

  return (ast, vfile) => {
    const componentName = path.parse(vfile.path).name;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const propsTables: Record<string, any> = {};

    const componentDoc = getComponentDoc(options.sourceRootPath, componentName);

    let sourcePath = '';

    if (componentDoc) {
      sourcePath = componentDoc.sourcePath;
      propsTables[componentName] = componentDoc.propsTable;
    }

    const mdast = ast as Root;

    visit(mdast, 'mdxJsxFlowElement', (node, index, parent) => {
      const elem = node as MdxJsxFlowElement;

      if (elem.name == 'PropsTable' || elem.name == 'Showcase') {
        const nodeComponentName = elem.attributes?.find((attr) => (attr as MdxJsxAttribute).name == 'componentName')
          ?.value as string;

        if (!nodeComponentName) {
          throw new Error(`Invalid componentName for PropsTable.`);
        }

        if (!propsTables[componentName]) {
          const nodeComponentDoc = getComponentDoc(options.sourceRootPath, nodeComponentName);

          if (nodeComponentDoc) {
            propsTables[nodeComponentName] = nodeComponentDoc.propsTable;
          }
        }

        if (propsTables[componentName]) {
          const tree = fromMarkdown(
            `<${elem.name} componentName='${nodeComponentName}' componentProps={propsTables['${nodeComponentName}']} />`,
            {
              extensions: [mdxjs()],
              mdastExtensions: [mdxFromMarkdown()],
            }
          );

          if (parent && index) {
            parent.children[index] = tree.children[0];
          }
        }
      }
    });

    mdast.children.unshift(getExportEtree(sourcePathName, sourcePath));
    mdast.children.unshift(getExportEtree(propsTablesName, propsTables));
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getExportEtree = (name: string, value: any): MdxjsEsm => {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: valueToEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  };
};

const docgenParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: true,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop: PropItem) => {
    if (['as', 'ref', 'style', 'className'].includes(prop.name)) {
      return false;
    }

    if (prop.declarations && prop.declarations.length > 0) {
      return Boolean(prop.declarations.find((declaration) => !declaration.fileName.includes('node_modules')));
    }

    return true;
  },
});

const getComponentDoc = (
  sourceRootPath: string,
  componentName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { sourcePath: string; propsTable: any } | null => {
  const files = fs.sync(`${sourceRootPath}/**/${componentName}.tsx`);

  for (const file of files) {
    const componentDoc = docgenParser.parse(file).find((item: ComponentDoc) => {
      return item.displayName == componentName;
    });

    if (componentDoc) {
      return {
        sourcePath: componentDoc.filePath.replace(sourceRootPath, ''),
        propsTable: Object.entries(componentDoc.props).map(([key, value]) => {
          const type = {
            name: value.type.name,
            values: null,
            control: value.type.name,
          };

          if (value.type.name == 'enum') {
            if (!value.type.raw) {
              type.name = value.type.name;
            } else if (
              value.type.raw.includes(' | ') ||
              ['string', 'number', 'boolean', 'ReactNode'].includes(value.type.raw)
            ) {
              type.name = value.type.raw;
              type.control = value.type.raw;

              if (value.type.raw.includes(' | ')) {
                type.values = value.type.value.map((item: { value: string }) => item.value);
                type.control = 'select';
              }
            } else {
              const values = value.type.value.map((item: { value: string }) => item.value);
              type.values = values;
              type.name = values.join(' | ');
              type.control = 'select';
            }
          }

          return {
            name: key,
            type: type,
            required: value.required,
            description: value.description,
            defaultValue: value.defaultValue,
          };
        }),
      };
    }
  }

  return null;
};
