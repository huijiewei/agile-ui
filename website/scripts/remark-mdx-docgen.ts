import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { valueToEstree } from 'estree-util-value-to-estree';
import type { Root } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdx';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import { resolve } from 'path';
import { PropItem, withCustomConfig } from 'react-docgen-typescript';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';

type RemarkMdxDocgenOptions = {
  name?: string;
  sourceRootPath: string;
};

export const kebabCase = (str: string): string =>
  (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g) || []).join('-').toLowerCase();

export const remarkMdxDocgen: Plugin<[RemarkMdxDocgenOptions]> = (options) => {
  const name = options?.name || 'propsTables';

  if (!isIdentifierName(name)) {
    throw new Error(`Invalid name for an identifier: ${name}`);
  }

  if (!options?.sourceRootPath) {
    throw new Error(`Please set sourceRootPath.`);
  }

  return (ast) => {
    const mdast = ast as Root;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const propsTables: Record<string, any> = {};

    visit(mdast, 'mdxJsxFlowElement', (node, index, parent) => {
      const elem = node as MdxJsxFlowElement;

      if (elem.name == 'PropsTable') {
        const componentName = elem.attributes?.find((attr) => (attr as MdxJsxAttribute).name == 'componentName')
          ?.value as string;

        if (!componentName) {
          throw new Error(`Invalid componentName for PropsTable.`);
        }

        if (!propsTables[componentName]) {
          propsTables[componentName] = getComponentProps(
            resolve(options.sourceRootPath, kebabCase(componentName), `${componentName}.tsx`),
            componentName
          );
        }

        const tree = fromMarkdown(
          `<${elem.name} componentName='${componentName}' componentProps={propsTables['${componentName}']} />`,
          {
            extensions: [mdxjs()],
            mdastExtensions: [mdxFromMarkdown()],
          }
        );

        if (parent && index) {
          parent.children[index] = tree.children[0];
        }
      }
    });

    const propsTablesExport: MdxjsEsm = {
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
                  { type: 'VariableDeclarator', id: { type: 'Identifier', name }, init: valueToEstree(propsTables) },
                ],
              },
            },
          ],
        },
      },
    };

    mdast.children.unshift(propsTablesExport);
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

const getComponentProps = (file: string, componentName: string) => {
  const type = docgenParser.parse(file).find((item: { displayName: string }) => item.displayName == componentName);

  if (type?.props) {
    return Object.entries(type.props).map(([key, value]) => {
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
    });
  }

  return [];
};
