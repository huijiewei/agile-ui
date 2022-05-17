import { ComponentProp, PropValue } from './PlaygroundHelper';

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
          defaultValue={defaultValue?.toString()}
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
