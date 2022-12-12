import type { ComponentProp } from '../playground/PlaygroundHelper';

export type MdxPropsTableProps = {
  tableTitle?: string;
  componentName: string;
  componentProps: ComponentProp[];
};

export const MdxPropsTable = ({ componentProps, tableTitle }: MdxPropsTableProps) => {
  return (
    <table className={'w-full table-auto border-separate rounded border border-gray-200'}>
      {tableTitle && <caption className={'mb-1.5 text-left font-bold text-gray-500'}>{tableTitle}</caption>}
      <thead>
        <tr className={'bg-gray-50'}>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>参数名</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>描述</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>默认值</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>是否必须</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>类型</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((prop, i) => (
          <tr
            className={
              'last:(border-none pb-0 mb-0) tablet:(table-row flex-no-wrap border-none mb-0) mb-[1px] flex flex-row flex-wrap border-b border-b-gray-200 pb-[1px]'
            }
            key={`${prop.name}-${i}`}
          >
            <td className={'tablet:(table-cell p-2 w-auto) block w-full whitespace-nowrap'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">参数名</span>
              {prop.name}
            </td>
            <td className={'tablet:(table-cell p-2 w-auto) block w-full'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">描述</span>
              {prop.description || '-'}
            </td>
            <td className={'tablet:(table-cell text-center w-auto p-2) block w-full whitespace-nowrap'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">默认值</span>
              {prop.defaultValue?.value || '-'}
            </td>
            <td className={'tablet:(table-cell text-center w-auto p-2) block w-full whitespace-nowrap'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">是否必须</span>
              {prop.required ? 'true' : 'false'}
            </td>
            <td className={'tablet:(table-cell p-2 w-auto) block w-full'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">类型</span>
              {prop.type.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
