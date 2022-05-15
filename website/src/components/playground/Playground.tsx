import { ElementType, ReactNode, useState } from 'react';
import { Prop } from '../mdx/MdxPropsTable';

type PropValue = string | number | boolean | ReactNode;

type PlaygroundProps = {
  component: ElementType;
  componentProps: Prop[];
  defaultProps?: Record<string, PropValue>;
};

const ComponentPropControl = ({ prop, onChange }: { prop: Prop; onChange: (value: PropValue) => void }) => {
  console.log(prop);
  return <div></div>;
};

export const Playground = (props: PlaygroundProps) => {
  const { component: Component, componentProps, defaultProps = {} } = props;

  const [state, setState] = useState(
    Object.fromEntries(Object.entries(defaultProps).map(([key, value]) => [key, value]))
  );

  const setStateField = (field: string, value: PropValue) => setState((current) => ({ ...current, [field]: value }));

  return (
    <div className={'flex min-h-[20em] flex-col rounded border border-slate-200 tablet:flex-row'}>
      <div
        className={
          'flex flex-1 items-center justify-center rounded bg-slate-50 bg-gradient-radial-dot from-slate-200 to-transparent bg-[length:16px_16px] p-3'
        }
      >
        <Component {...state} />
      </div>
      <div className={'border-t border-gray-200 p-3 tablet:w-[250px] tablet:border-l tablet:border-t-0'}>
        <div className={'flex flex-col space-y-2'}>
          {componentProps.map((prop) => (
            <>
              <p key={prop.name}>{prop.description}</p>
              <ComponentPropControl prop={prop} onChange={(value: PropValue) => setStateField(prop.name, value)} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
