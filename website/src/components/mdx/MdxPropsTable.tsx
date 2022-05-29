import type { ComponentProp } from '../playground/PlaygroundHelper';

export const MdxPropsTable = ({ componentProps }: { componentProps: ComponentProp[] }) => {
  return (
    <div className={'rounded border border-slate-200'}>
      <table className={'w-full table-auto'}>
        <thead>
          <tr className={'bg-slate-100'}>
            <th className={'px-3 py-2 text-left whitespace-nowrap'}>参数名</th>
            <th className={'px-3 py-2 text-left whitespace-nowrap'}>描述</th>
            <th className={'px-3 py-2 text-left whitespace-nowrap'}>默认值</th>
            <th className={'px-3 py-2 text-left whitespace-nowrap'}>是否必须</th>
            <th className={'px-3 py-2 text-left whitespace-nowrap'}>类型</th>
          </tr>
        </thead>
        <tbody>
          {componentProps.map((prop) => (
            <tr key={prop.name}>
              <td className={'px-3 py-2 text-left whitespace-nowrap'}>{prop.name}</td>
              <td className={'px-3 py-2 text-left whitespace-nowrap'}>{prop.description || '-'}</td>
              <td className={'px-3 py-2 text-left whitespace-nowrap'}>{prop.defaultValue?.value || '-'}</td>
              <td className={'px-3 py-2 text-left whitespace-nowrap'}>{prop.required ? 'true' : 'false'}</td>
              <td className={'px-3 py-2 text-left'}>{prop.type.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
