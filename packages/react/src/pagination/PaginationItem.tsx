import { polymorphicComponent } from '../utils/component';
import type { PaginationItemProps } from './usePagination';
import { cx } from 'twind';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import type { ScaleColor } from '../utils/types';

export const PaginationItem = polymorphicComponent<'button', PaginationItemProps & { color?: ScaleColor }>(
  (props, ref) => {
    const { as: Component = 'button', className, color, page, type, disabled, selected, ...rest } = props;

    const title = type == 'previous' ? '上一页' : type == 'next' ? '下一页' : `第 ${page} 页`;

    return (
      <Component
        ref={ref}
        title={title}
        disabled={disabled}
        data-disabled={dataAttr(disabled)}
        className={cx(
          'min-w-[1.75rem] h-7 px-2 rounded flex items-center justify-center transition-colors select-none appearance-none disabled:(cursor-not-allowed opacity-50)',
          selected ? `bg-${color}-500 text-white` : 'bg-gray-100',
          !disabled && (selected ? `hover:bg-${color}-600` : 'hover:bg-gray-200'),
          className
        )}
        {...rest}
      >
        {type == 'previous' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={'1em'}
            width={'1em'}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        ) : type == 'next' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={'1em'}
            width={'1em'}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        ) : type == 'end-ellipsis' || type == 'start-ellipsis' ? (
          '...'
        ) : (
          page
        )}
      </Component>
    );
  }
);

if (__DEV__) {
  PaginationItem.displayName = 'PaginationItem';
}
