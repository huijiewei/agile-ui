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
    <div className={'flex flex-row border border-gray-200 rounded min-h-[20em]'}>
      <div
        className={
          'flex flex-1 justify-center items-center p-3 bg-gray-50 bg-gradient-radial-dot from-gray-200 to-transparent bg-[length:16px_16px]'
        }
      >
        <Component {...state} />
      </div>
      <div className={'border-l border-l-gray-200 w-[250px] p-3'}>
        <div className={'flex flex-col space-y-2'}>
          <p>123</p>
          <p>456</p>
        </div>
      </div>
    </div>
  );
};
