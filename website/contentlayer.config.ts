import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { resolve } from 'path';
import { PropItem, withCustomConfig } from 'react-docgen-typescript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta';
import { slugify } from './src/utils/string';
import slugger from 'github-slugger';

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

    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes('node_modules');
      });

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
});

const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

const getComponentProps = (componentName: string) => {
  const slug = slugify(componentName);

  const pathname = resolve(`../packages/react/src/${slug}/${componentName}.tsx`);

  const type = docgenParser.parse(pathname).find((item: { displayName: string }) => item.displayName == componentName);

  console.log(type?.props);

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
          ['string', 'number', 'boolean', 'ReactNode', 'ColorWithLevel'].includes(value.type.raw)
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
        return getComponentProps(getComponentName(doc._raw.sourceFileName));
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
