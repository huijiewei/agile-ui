import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Component = defineDocumentType(() => ({
  name: 'Component',
  filePathPattern: 'components/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    frontmatter: {
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
        author: doc.author,
        slug: `/${doc._raw.flattenedPath}`,
      }),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'docs',
  documentTypes: [Component],
});

export default contentLayerConfig;
