import type { ReactNode } from 'react';
import type { Dict } from '@agile-ui/utils';

export type PropValue = string | number | boolean | ReactNode;

export type ComponentProp = {
  name: string;
  description: string;
  defaultValue: {
    value: string;
  };
  required: boolean;
  type: {
    name: string;
    values: string[] | null;
    control: string;
  };
};

const getOffset = (value: boolean | number) => {
  if (typeof value === 'boolean') {
    return '\n  ';
  }

  return `\n${Array(value).fill('  ').join('')}`;
};

const propToString = ({
  name,
  type,
  value,
  defaultValue,
}: {
  name: string;
  type: string;
  value: PropValue;
  defaultValue: PropValue;
}) => {
  if (name === 'children' || !value) {
    return '';
  }

  if (type == 'select' || type == 'number' || type == 'string') {
    if (value && value.toString() != defaultValue?.toString().slice(1, -1)) {
      return `${name}={'${value}'}`;
    }

    return '';
  }

  if (type == 'boolean') {
    if (value && defaultValue && value.toString() != defaultValue.toString().slice(1, -1)) {
      return value ? name : `${name}={false}`;
    }

    return '';
  }

  return `${name}="${value}"`;
};

export const propsToString = ({
  props,
  values,
  multiline,
}: {
  props: ComponentProp[];
  values: Dict<PropValue>;
  multiline: boolean;
}) => {
  return props
    .map((prop) =>
      propToString({
        name: prop.name,
        type: prop.type.control,
        value: values[prop.name],
        defaultValue: prop.defaultValue?.value,
      })
    )
    .filter(Boolean)
    .join(multiline ? getOffset(multiline) : ' ')
    .trim();
};
