// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { hasValue, isObjectLikeProp, isUnionProp, parseFiles } from '@structured-types/api';
import reactPlugin from '@structured-types/react-plugin';
import { getComponentPathName } from './contentlayer-helper';

export const getComponentDocsByStructuredTypes = (componentName: string) => {
  const pathname = getComponentPathName(componentName);

  const props = parseFiles([pathname], {
    collectSourceInfo: true,
    collectInnerLocations: true,
    filter: (prop) => {
      if (['as', 'ref', 'style', 'className'].includes(prop.name || '')) {
        return false;
      }

      return !prop.loc?.filePath?.includes('node_modules/@types/react');
    },
    plugins: [reactPlugin],
  });

  const result = Object.keys(props)
    .filter((key) => props[key].kind == 25)
    .map((key) => {
      const prop = props[key];

      if (isObjectLikeProp(prop)) {
        return prop.properties?.map((property) => {
          console.log(JSON.stringify(property, null, 2));

          const propType: {
            name: string;
            description: string;
            required: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            defaultValue: any | undefined;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            values: any[] | undefined;
          } = {
            name: property.name || '',
            description: property.description || '',
            required: !property.optional,
            defaultValue: hasValue(property) ? property.value : undefined,
            values: undefined,
          };

          if (isUnionProp(property)) {
            propType.values = property.properties?.map((value) => {
              if (hasValue(value)) {
                return value.value;
              }
            });
          }

          return propType;
        });
      }

      return null;
    });

  return result.filter((item) => item !== null);
};
