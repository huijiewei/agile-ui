import { Dict, pascalCase } from '@agile-ui/utils';
import { ElementType, useState } from 'react';
import { cx } from '@twind/core';
import { PlaygroundCode } from './PlaygroundCode';
import { PlaygroundControl } from './PlaygroundControl';
import { ComponentProp, propsToString, PropValue } from './PlaygroundHelper';

type PlaygroundProps = {
  component: ElementType;
  componentProps: ComponentProp[];
  ignoreProps?: string[];
  defaultProps?: Dict<PropValue>;
  includeCode?: boolean;
  codePropsMultiline?: boolean;
  codeTemplate: (props: string, children?: PropValue) => string;
};

const getDescription = (key: string) => {
  if (key == 'children') {
    return '内容';
  }

  if (key == 'placeholder') {
    return '占位符';
  }

  return pascalCase(key);
};

export const Playground = (props: PlaygroundProps) => {
  const {
    component: Component,
    includeCode = true,
    codeTemplate,
    codePropsMultiline = false,
    componentProps,
    ignoreProps = [],
    defaultProps = {},
  } = props;

  const [state, setState] = useState(
    Object.fromEntries(Object.entries(defaultProps).map(([key, value]) => [key, value]))
  );

  const propsCode = propsToString({
    props: componentProps,
    values: state,
    multiline: codePropsMultiline,
  });

  const code = codeTemplate(propsCode.length > 0 ? ` ${propsCode}` : propsCode, state.children).trim();

  return (
    <div>
      <div
        className={cx(
          'flex min-h-[20em] flex-col rounded border border-gray-200 tablet:flex-row',
          includeCode && 'rounded-b-none border-b-0'
        )}
      >
        <div
          className={
            'bg-[16px_16px] flex flex-1 items-center justify-center rounded bg-gray-50 bg-gradient-radial-dot from-gray-100 to-transparent p-3'
          }
        >
          <Component {...state} />
        </div>
        <div className={'border-t border-gray-200 p-3 tablet:w-[260px] tablet:border-l tablet:border-t-0'}>
          <div className={'flex flex-col gap-2'}>
            {componentProps.map((prop) => {
              if (ignoreProps.includes(prop.name)) {
                return null;
              }

              return (
                <PlaygroundControl
                  key={prop.name}
                  prop={prop}
                  defaultValue={
                    state[prop.name]
                      ? state[prop.name]
                      : prop.type.control == 'select' || prop.type.control == 'color'
                      ? prop.defaultValue?.value.slice(1, -1)
                      : prop.defaultValue?.value
                  }
                  onChange={(value) => setState((current) => ({ ...current, [prop.name]: value }))}
                />
              );
            })}
            {Object.keys(state).map((key) => {
              if (componentProps.find((prop) => prop.name == key)) {
                return null;
              }

              if (ignoreProps.includes(key)) {
                return null;
              }

              const value = state[key];
              const type = defaultProps[key];

              return (
                <PlaygroundControl
                  key={key}
                  prop={{
                    name: key,
                    required: false,
                    description: getDescription(key),
                    defaultValue: { value: value?.toString() || '' },
                    type: {
                      name: typeof type,
                      control: typeof type,
                      values: null,
                    },
                  }}
                  defaultValue={value}
                  onChange={(value) => setState((current) => ({ ...current, [key]: value }))}
                />
              );
            })}
          </div>
        </div>
      </div>
      {includeCode && <PlaygroundCode code={code} />}
    </div>
  );
};
