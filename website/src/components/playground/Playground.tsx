import { ElementType, ReactNode, useState } from 'react';
import { camelCase } from '../../utils/string';
import { Prop } from '../mdx/MdxPropsTable';

type PropValue = string | number | boolean | ReactNode;

type PlaygroundProps = {
  component: ElementType;
  componentProps: Prop[];
  defaultProps?: Record<string, PropValue>;
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
  const { component: Component, componentProps, defaultProps = {} } = props;

  const [state, setState] = useState(
    Object.fromEntries(Object.entries(defaultProps).map(([key, value]) => [key, value]))
  );

  return (
    <div className={'flex min-h-[20em] flex-col rounded border border-slate-200 tablet:flex-row'}>
      <div
        className={
          'flex flex-1 items-center justify-center rounded bg-slate-50 bg-gradient-radial-dot from-slate-200 to-transparent bg-[length:16px_16px] p-3'
        }
      >
        <Component {...state} />
      </div>
      <div className={'border-t border-gray-200 p-3 tablet:w-[260px] tablet:border-l tablet:border-t-0'}>
        <div className={'flex flex-col space-y-3'}>
          {componentProps.map((prop) => (
            <ComponentPropControl
              key={prop.name}
              prop={prop}
              defaultValue={state[prop.name] ? state[prop.name] : prop.defaultValue?.value}
              onChange={(value) => setState((current) => ({ ...current, [prop.name]: value }))}
            />
          ))}
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
  );
};
