import type { ScaleColor } from '../utils/types';
import { primitiveComponent } from '../utils/component';
import type { PaginationItemProps, UsePaginationOptions } from './usePagination';
import { usePagination } from './usePagination';
import { cx } from 'twind';
import { PaginationItem } from './PaginationItem';
import { __DEV__ } from '@agile-ui/utils';
import { PaginationJumper } from './PaginationJumper';

export type PaginationProps = UsePaginationOptions & {
  /**
   * 大小
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 是否显示总数
   * @default true
   */
  showTotal?: boolean;

  /**
   * 是否显示跳转
   * @default false
   */
  showJumper?: boolean;

  /**
   * 自定义分页渲染
   */
  itemRender?: (props: PaginationItemProps) => JSX.Element;
};

export const Pagination = primitiveComponent<'div', PaginationProps>((props, ref) => {
  const {
    className,
    size = 'md',
    color = 'blue',
    disabled = false,
    page,
    defaultPage,
    pageSize,
    total,
    siblings,
    boundaries,
    onChange,
    showTotal = true,
    showJumper = false,
    itemRender = (props) => <PaginationItem color={color} {...props} />,
    ...rest
  } = props;

  const {
    pages,
    totalPage,
    page: currentPage,
    setPage,
  } = usePagination({
    page,
    defaultPage,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
    onChange,
  });

  return (
    <div role={'navigation'} ref={ref} className={cx('flex gap-3', className)} {...rest}>
      {showTotal && <div className={'px-2 rounded bg-gray-100 flex items-center justify-center'}>共 {total} 条</div>}
      <ul className={'flex gap-2'}>
        {pages.map((page) => (
          <li key={`${page.type}-${page.page}`}>{itemRender({ ...page })}</li>
        ))}
      </ul>
      {showJumper && <PaginationJumper page={currentPage} totalPage={totalPage} setPage={setPage} />}
    </div>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}
