import { ElementType, useState } from 'react';

type PlaygroundProps = {
  component: ElementType;
  defaultProps?: Record<string, string | number | boolean | { options: string[]; default: string }>;
};

export const Playground = (props: PlaygroundProps) => {
  const { component: Component, defaultProps = {} } = props;

  const [state, setState] = useState(
    Object.fromEntries(
      Object.entries(defaultProps).map(([key, value]) => [key, typeof value === 'object' ? value.default : value])
    )
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
      <div className={'border-t border-gray-200 p-3 tablet:w-[250px] tablet:border-l tablet:border-t-0'}>
        <div className={'flex flex-col space-y-2'}>
          <p>123</p>
          <p>456</p>
        </div>
      </div>
    </div>
  );
};
