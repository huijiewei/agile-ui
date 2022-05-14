type Prop = {
  name: string;
  description: string;
  defaultValue: {
    value: string;
  };
  required: boolean;
  type: {
    raw: string;
    name: string;
  };
};

export const MdxPropsTable = ({ types }: { types: Prop[] }) => {
  const props = Object.values(types);

  return (
    <table className={'w-full table-auto border-collapse border-collapse border border-slate-200'}>
      <thead>
        <tr className={'bg-slate-100'}>
          <th className={'px-3 py-2 text-left'}>参数名</th>
          <th className={'px-3 py-2 text-left'}>描述</th>
          <th className={'px-3 py-2 text-left'}>默认值</th>
          <th className={'px-3 py-2 text-left'}>是否必须</th>
          <th className={'px-3 py-2 text-left'}>类型</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td className={'px-3 py-2 text-left'}>{prop.name}</td>
            <td className={'px-3 py-2 text-left'}>{prop.description || '-'}</td>
            <td className={'px-3 py-2 text-left'}>{prop.defaultValue?.value || '-'}</td>
            <td className={'px-3 py-2 text-left'}>{prop.required ? 'true' : 'false'}</td>
            <td className={'px-3 py-2 text-left'}>{prop.type.raw || prop.type.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
