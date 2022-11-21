import { Checkbox, Input, NativeSelect } from '@agile-ui/react';
import { Check } from '@agile-ui/react-icons';
import { cx } from '@twind/core';
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
        <Checkbox defaultChecked={defaultValue?.toString() == 'true'} onChange={(checked) => onChange(checked)} />
      )}
      {prop.type.control == 'number' && (
        <Input
          defaultValue={defaultValue != 'Infinity' && defaultValue != '-Infinity' ? defaultValue?.toString() : ''}
          type="text"
          size={'sm'}
          className={'w-1/2'}
          onChange={(value) => onChange(value == '' ? undefined : value)}
        />
      )}
      {(prop.type.control == 'string' || prop.type.control == 'ReactNode') && (
        <Input
          defaultValue={defaultValue?.toString()}
          type="text"
          size={'sm'}
          className={'w-1/2'}
          onChange={(value) => onChange(value)}
        />
      )}
      {prop.type.control == 'select' &&
        (prop.description == '颜色' ? (
          <div className={'inline-flex flex-row w-36 flex-wrap gap-1 justify-right'}>
            {prop.type.values?.map((value) => {
              const valueString = value.toString().slice(1, -1);

              return (
                <button
                  title={valueString}
                  key={`${valueString}`}
                  className={cx(
                    'rounded-sm h-6 text-gray-50 w-6 outline-none justify-center flex items-center leading-6',
                    valueString == 'black' || valueString == 'white' ? `bg-${valueString}` : `bg-${valueString}-500`
                  )}
                  onClick={() => onChange(valueString)}
                >
                  {defaultValue?.toString() == valueString ? <Check className={'h-4 w-4'} /> : ' '}
                </button>
              );
            })}
          </div>
        ) : (
          <NativeSelect
            size={'sm'}
            onChange={(event) => onChange(event.target.value)}
            defaultValue={defaultValue?.toString()}
          >
            {prop.type.values?.map((value) => {
              if (value == 'number' || value == 'string') {
                return null;
              }

              const valueString = value.toString().slice(1, -1);

              return (
                <option value={valueString} key={`${valueString}`}>
                  {valueString}
                </option>
              );
            })}
          </NativeSelect>
        ))}
    </label>
  );
};
