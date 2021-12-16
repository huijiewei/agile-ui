import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { withCustomConfig } from 'react-docgen-typescript';

const log = (...args: unknown[]) => {
  console.info(`[docgen]`, ...args);
};

const filePaths = [path.resolve(__dirname, '../packages/react/src')]
  .map((folderPath) => {
    return glob.sync('**/+([A-Z])*.tsx', {
      absolute: true,
      cwd: folderPath,
    });
  })
  .flat();

const docgenParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: true,
  propFilter: (prop: { name: string }) => {
    if (prop.name === 'as') {
      return false;
    }

    if (prop.name === 'ref') {
      return false;
    }

    return true;
  },
});

const componentDocs = docgenParser.parse(filePaths);

fs.ensureDirSync(path.join(__dirname, '../website/.docgen'));

fs.writeJSONSync(path.join(__dirname, '../website/.docgen/docgen.json'), componentDocs, {
  spaces: 2,
});
