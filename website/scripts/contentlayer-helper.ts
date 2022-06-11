import { resolve } from 'path';
import { slugify } from '../src/utils/string';

export const gitHubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

export const getComponentName = (filename: string) => {
  return filename.replace(/\.mdx$/, '');
};

export const getComponentPathName = (componentName: string) => {
  const slug = slugify(componentName);

  return resolve(`../packages/react/src/${slug}/${componentName}.tsx`);
};
