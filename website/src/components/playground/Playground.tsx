import { CopyIcon, twClsx } from '@agile-ui/react';
import { ElementType, ReactNode, useState } from 'react';
import { LiveEditor } from 'react-live';
import { camelCase } from '../../utils/string';
import { Prop } from '../mdx/MdxPropsTable';

export type PropValue = string | number | boolean | ReactNode;

type PlaygroundProps = {
  component: ElementType;
  componentProps: Prop[];
  defaultProps?: Record<string, PropValue>;
  includeCode?: boolean;
  codePropsMultiline?: boolean;
  codeTemplate: (props: string, children?: PropValue) => string;
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

const propsToString = ({
  props,
  values,
  multiline,
}: {
  props: Prop[];
  values: Record<string, PropValue>;
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

const ComponentPropControl = ({
  prop,
  defaultValue,
  onChange,
}: {
  prop: Prop;
  defaultValue: PropValue;
  onChange: (value: PropValue) => void;
}) => {
  return (
    <label className={'inline-flex items-center justify-between gap-3'}>
      <div className={'whitespace-nowrap'}>{prop.description}</div>
      {prop.type.control == 'boolean' && (
        <input
          className={'rounded-sm border border-slate-300'}
          defaultChecked={defaultValue?.toString() == 'true'}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
      {(prop.type.control == 'string' || prop.type.control == 'ReactNode') && (
        <input
          className={'rounded-sm border border-slate-300 px-1.5 py-0.5'}
          defaultValue={defaultValue?.toString()}
          type="text"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {prop.type.control == 'select' && (
        <select
          onChange={(e) => onChange(e.target.value)}
          className={'rounded-sm border border-slate-300 px-1.5 py-0.5'}
          defaultValue={defaultValue?.toString().slice(1, -1)}
        >
          {prop.type.values?.map((value) => {
            const valueString = value.toString().slice(1, -1);

            return (
              <option value={valueString} key={valueString}>
                {valueString}
              </option>
            );
          })}
        </select>
      )}
    </label>
  );
};

export const Playground = (props: PlaygroundProps) => {
  const {
    component: Component,
    includeCode = true,
    codeTemplate,
    codePropsMultiline = false,
    componentProps,
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
        className={twClsx(
          'flex min-h-[20em] flex-col rounded border border-slate-200 tablet:flex-row',
          includeCode && 'rounded-b-none border-b-0'
        )}
      >
        <div
          className={
            'flex flex-1 items-center justify-center rounded bg-slate-50 bg-gradient-radial-dot from-slate-200 to-transparent bg-[length:16px_16px] p-3'
          }
        >
          <Component {...state} />
        </div>
        <div className={'border-t border-gray-200 p-3 tablet:w-[260px] tablet:border-l tablet:border-t-0'}>
          <div className={'flex flex-col space-y-3'}>
            {componentProps.map((prop) => {
              if (prop.type.name == 'ReactNode') {
                return null;
              }
              return (
                <ComponentPropControl
                  key={prop.name}
                  prop={prop}
                  defaultValue={state[prop.name] ? state[prop.name] : prop.defaultValue?.value}
                  onChange={(value) => setState((current) => ({ ...current, [prop.name]: value }))}
                />
              );
            })}
            {Object.keys(state).map((key) => {
              if (componentProps.find((prop) => prop.name == key)) {
                return null;
              }

              const value = state[key];
              const type = defaultProps[key];

              return (
                <ComponentPropControl
                  key={key}
                  prop={{
                    name: key,
                    required: false,
                    description: key == 'children' ? '内容' : camelCase(key),
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
      {includeCode && (
        <div className={'relative'}>
          <LiveEditor
            disabled
            code={code}
            className={'rounded rounded-t-none bg-slate-700 font-mono text-[13px]'}
            language={'tsx'}
          />
          <CopyIcon content={code} />
        </div>
      )}
    </div>
  );
};
