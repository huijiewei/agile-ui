import { resolve } from 'path';

const kebabCase = (str: string): string =>
  str.replace(/\B([A-Z])(?=[a-z])|(?<=[a-z0-9])([A-Z])/g, '-$1$2').toLowerCase();

const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

export const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

export const getComponentPathName = (componentName: string) => {
  const slug = kebabCase(componentName);

  return resolve(`../packages/react/src/${slug}/${componentName}.tsx`);
};

export const getComponentDocLink = (filename: string) => {
  const name = getComponentName(filename);
  return `${gitHubUrl}/website/docs/components/${name}.mdx`;
};

export const getComponentSourceLink = (filename: string) => {
  const name = getComponentName(filename);
  const slug = kebabCase(name);
  return `${gitHubUrl}/packages/react/src/${slug}/${name}.tsx`;
};
