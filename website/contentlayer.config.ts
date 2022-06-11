import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import slugger from 'github-slugger';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta';
import { getComponentName, gitHubUrl } from './scripts/contentlayer-helper';
import { getComponentPropsByReactDocgenTypescript } from './scripts/react-docgen-typescript';
import { slugify } from './src/utils/string';

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
        return getComponentPropsByReactDocgenTypescript(getComponentName(doc._raw.sourceFileName));
      },
    },
    headings: {
      type: 'json',
      resolve: (doc) => {
        const text: string = doc.body.raw;

        const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm');
        const headings = [...text.matchAll(regexp)];

        if (headings.length) {
          return headings.map((heading) => {
            const headingText = heading[2].trim();
            const headingType = heading[1].trim() == '##' ? 'h2' : 'h3';
            const headingLink = slugger.slug(headingText, false);

            return {
              text: headingText,
              id: headingLink,
              level: headingType,
            };
          });
        }

        return [];
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
    remarkPlugins: [remarkGfm, remarkMdxCodeMeta],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4'],
        },
      ],
    ],
  },
});

export default contentLayerConfig;
