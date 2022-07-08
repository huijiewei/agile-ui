import type { ComponentProp } from '../playground/PlaygroundHelper';

export type MdxPropsTableProps = {
  componentName: string;
  componentProps: ComponentProp[];
};

export const MdxPropsTable = ({ componentProps }: { componentProps: ComponentProp[] }) => {
  return (
    <table className={'w-full table-auto border-separate rounded border border-gray-200 dark:border-gray-600'}>
      <thead>
        <tr className={'bg-gray-50 dark:bg-gray-800'}>
          <th className={'p-2 text-left whitespace-nowrap hidden tablet:table-cell'}>参数名</th>
          <th className={'p-2 text-left whitespace-nowrap hidden tablet:table-cell'}>描述</th>
          <th className={'p-2 text-center whitespace-nowrap hidden tablet:table-cell'}>默认值</th>
          <th className={'p-2 text-center whitespace-nowrap hidden tablet:table-cell'}>是否必须</th>
          <th className={'p-2 text-left whitespace-nowrap hidden tablet:table-cell'}>类型</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((prop, i) => (
          <tr
            className={
              'flex flex-row flex-wrap border-b border-b-gray-200 pb-[1px] mb-[1px] last:(border-none pb-0 mb-0) tablet:(table-row flex-no-wrap border-none mb-0)'
            }
            key={`${prop.name}-${i}`}
          >
            <td className={'w-full text-left block tablet:(table-cell w-auto p-2)'}>
              <span className="tablet:hidden inline-block mr-3 w-1/5 bg-gray-50 p-2 text-sm font-bold">参数名</span>
              {prop.name}
            </td>
            <td className={'w-full text-left block tablet:(table-cell w-auto p-2)'}>
              <span className="tablet:hidden inline-block mr-3 w-1/5 bg-gray-50 p-2 text-sm font-bold">描述</span>
              {prop.description || '-'}
            </td>
            <td className={'w-full text-left block tablet:(table-cell w-auto p-2)'}>
              <span className="tablet:hidden inline-block mr-3 w-1/5 bg-gray-50 p-2 text-sm font-bold">默认值</span>
              {prop.defaultValue?.value || '-'}
            </td>
            <td className={'w-full text-left block tablet:(table-cell w-auto p-2)'}>
              <span className="tablet:hidden inline-block mr-3 w-1/5 bg-gray-50 p-2 text-sm font-bold">是否必须</span>
              {prop.required ? 'true' : 'false'}
            </td>
            <td className={'w-full text-left block tablet:(table-cell w-auto p-2)'}>
              <span className="tablet:hidden inline-block mr-3 w-1/5 bg-gray-50 p-2 text-sm font-bold">类型</span>
              {prop.type.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
