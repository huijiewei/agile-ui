import { Input } from '@agile-ui/react';
import { Check } from '@agile-ui/react-icons';
import { tx } from 'twind';
import type { ComponentProp, PropValue } from './PlaygroundHelper';

export const PlaygroundControl = ({
  prop,
  defaultValue,
  onChange,
}: {
  prop: ComponentProp;
  defaultValue: PropValue;
  onChange: (value: PropValue) => void;
}) => {
  return (
    <label className={'inline-flex items-center justify-between gap-1'}>
      <div className={'whitespace-nowrap'}>{prop.description}</div>
      {prop.type.control == 'boolean' && (
        <input
          className={'rounded-sm border border-slate-300'}
          defaultChecked={defaultValue?.toString() == 'true'}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
      {(prop.type.control == 'string' || prop.type.control == 'ReactNode' || prop.type.control == 'ColorWithLevel') && (
        <Input
          defaultValue={defaultValue?.toString()}
          type="text"
          size={'sm'}
          className={'w-1/2'}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {prop.type.control == 'select' &&
        (prop.description == '颜色' ? (
          <div className={'inline-flex flex-row w-36 flex-wrap gap-1 justify-right'}>
            {prop.type.values?.map((value, i) => {
              const valueString = value.toString().slice(1, -1);
              return (
                <button
                  title={valueString}
                  key={`${valueString}-${i}`}
                  className={tx(
                    'rounded-sm h-6 text-slate-50 w-6 outline-none justify-center flex items-center leading-6',
                    `bg-${valueString}-600`
                  )}
                  onClick={() => onChange(valueString)}
                >
                  {defaultValue?.toString() == valueString ? <Check className={'h-3 w-3'} /> : ' '}
                </button>
              );
            })}
          </div>
        ) : (
          <select
            onChange={(e) => onChange(e.target.value)}
            className={'rounded-sm border bg-white dark:bg-slate-900 border-slate-300 px-1.5 py-0.5'}
            defaultValue={defaultValue?.toString()}
          >
            {prop.type.values?.map((value, i) => {
              const valueString = value.toString().slice(1, -1);

              return (
                <option value={valueString} key={`${valueString}-${i}`}>
                  {valueString}
                </option>
              );
            })}
          </select>
        ))}
    </label>
  );
};
