import { resolve } from 'path';

const slugify = (str: string): string =>
  str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');

const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

export const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

export const getComponentPathName = (componentName: string) => {
  const slug = slugify(componentName);

  return resolve(`../packages/react/src/${slug}/${componentName}.tsx`);
};

export const getComponentDocLink = (filename: string) => {
  const name = getComponentName(filename);
  return `${gitHubUrl}/website/docs/components/${name}.mdx`;
};

export const getComponentSourceLink = (filename: string) => {
  const name = getComponentName(filename);
  const slug = slugify(name);
  return `${gitHubUrl}/packages/react/src/${slug}/${name}.tsx`;
};
