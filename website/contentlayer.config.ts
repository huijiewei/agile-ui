import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { resolve } from 'path';
import { withCustomConfig } from 'react-docgen-typescript';
import remarkGfm from 'remark-gfm';
import { slugify } from './src/utils/string';

const docgenParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: true,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: {
    skipPropsWithName: ['as', 'ref', 'style', 'className'],
    skipPropsWithoutDoc: false,
  },
});

const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

const getComponentProps = (filename: string) => {
  const componentName = getComponentName(filename);
  const slug = slugify(componentName);

  const pathname = resolve(`../packages/react/src/${slug}/${componentName}.tsx`);

  const type = docgenParser.parse(pathname).find((item: { displayName: string }) => item.displayName == componentName);

  if (type?.props) {
    return Object.entries(type.props).map(([key, value]) => {
      const type = {
        name: value.type.name,
      };

      if (value.type.name == 'enum') {
        if (!value.type.raw) {
          type.name = value.type.name;
        } else if (
          value.type.raw.includes(' | ') ||
          ['string', 'number', 'boolean', 'ReactNode'].includes(value.type.raw)
        ) {
          type.name = value.type.raw;
        } else {
          type.name = value.type.value.map((item: { value: string }) => item.value).join(' | ');
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

  return {};
};

const Component = defineDocumentType(() => ({
  name: 'Component',
  filePathPattern: 'components/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => getComponentName(doc._raw.sourceFileName),
    },
    props: {
      type: 'json',
      resolve: (doc) => {
        return getComponentProps(doc._raw.sourceFileName);
      },
    },
    docsLink: {
      type: 'string',
      resolve: (doc) => {
        const name = getComponentName(doc._raw.sourceFileName);
        return `${gitHubUrl}/website/docs/components/${name}.mdx`;
      },
    },
    sourceLink: {
      type: 'string',
      resolve: (doc) => {
        const name = getComponentName(doc._raw.sourceFileName);
        const slug = slugify(name);
        return `${gitHubUrl}/packages/react/src/${slug}/${name}.tsx`;
      },
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'docs',
  documentTypes: [Component],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});

export default contentLayerConfig;
