import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { resolve } from 'path';
import { withCustomConfig } from 'react-docgen-typescript';
import { slugify } from './src/utils/string';

const docgenParser = withCustomConfig('tsconfig.json', {
  shouldExtractValuesFromUnion: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: {
    skipPropsWithName: ['as', 'ref', 'children', 'className', 'style'],
    skipPropsWithoutDoc: true,
  },
});

const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

const getTypes = (filename: string) => {
  const componentName = getComponentName(filename);
  const slug = slugify(componentName);

  const pathname = resolve(`../packages/react/src/${slug}/${componentName}.tsx`);

  const type = docgenParser.parse(pathname).find((item: { displayName: string }) => item.displayName === componentName);

  if (type) {
    return Object.entries(type.props).map(([key, value]) => {
      return {
        name: key,
        type: value.type,
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
    types: {
      type: 'json',
      resolve: (doc) => {
        return getTypes(doc._raw.sourceFileName);
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
});

export default contentLayerConfig;
