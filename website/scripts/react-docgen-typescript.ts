import { PropItem, withCustomConfig } from 'react-docgen-typescript';
import { getComponentName, getComponentPathName } from './contentlayer-helper';

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
      return Boolean(prop.declarations.find((declaration) => !declaration.fileName.includes('node_modules')));
    }

    return true;
  },
});

export const getComponentPropsByReactDocgenTypescript = (filename: string) => {
  const componentName = getComponentName(filename);

  const type = docgenParser
    .parse(getComponentPathName(componentName))
    .find((item: { displayName: string }) => item.displayName == componentName);

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
          ['string', 'number', 'boolean', 'ReactNode'].includes(value.type.raw)
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

  return [];
};
