import * as console from 'console';
import * as glob from 'fast-glob';
import * as path from 'path';
import { withDefaultConfig } from 'react-docgen-typescript';

const filePaths = [path.resolve(__dirname, '../packages/react/src')]
  .map((folderPath) => {
    return glob.sync('**/+([A-Z])*.tsx', {
      absolute: true,
      cwd: folderPath,
    });
  })
  .flat();

console.log(filePaths);

const docgenParser = withDefaultConfig({
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: (prop: { name: string }) => {
    if (prop.name === 'as') {
      return false;
    }

    return prop.name !== 'ref';
  },
});

const componentDocs = docgenParser.parse(filePaths);

console.log(componentDocs);
