import glob from 'fast-glob';
import path from 'path';
import { withCustomConfig } from 'react-docgen-typescript';

const log = (...args: unknown[]) => {
  console.info(`[props-docs]`, ...args);
};

const filePaths = [path.resolve(__dirname, '../packages/react/src')]
  .map((folderPath) => {
    return glob.sync('**/+([A-Z])*.tsx', {
      absolute: true,
      cwd: folderPath,
    });
  })
  .flat();

log(filePaths);

const docgenParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: true,
  propFilter: (prop: { name: string }) => {
    if (prop.name === 'as') {
      return false;
    }

    if (prop.name === 'ref') {
      return false;
    }

    //log(prop);

    return true;
  },
});

const componentDocs = docgenParser.parse(filePaths);

console.log(componentDocs);
