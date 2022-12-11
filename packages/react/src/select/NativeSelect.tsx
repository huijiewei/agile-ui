import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';
import { cx } from '@twind/core';

export type NativeSelectProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;
};

const selectSizes = {
  xs: {
    select: 'py-px text-sm pl-2 pr-6',
    chevron: 'w-6',
  },
  sm: {
    select: 'py-0.5 pl-2 pr-6',
    chevron: 'w-6',
  },
  md: {
    select: 'py-1 pl-3 pr-7',
    chevron: 'w-7',
  },
  lg: {
    select: 'py-1.5 pl-3 pr-8',
    chevron: 'w-8',
  },
  xl: {
    select: 'py-[7px] text-lg pl-3 pr-8',
    chevron: 'w-8',
  },
};

export const NativeSelect = primitiveComponent<'select', NativeSelectProps>((props, ref) => {
  const { size = 'md', disabled, children, className, ...rest } = props;

  return (
    <div className={cx('relative h-fit', className)}>
      <select
        disabled={disabled}
        className={cx(
          'focus:(border-blue-500) appearance-none rounded border border-gray-200 bg-white outline-none transition-colors',
          selectSizes[size]['select']
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
      <div
        className={cx(
          'pointer-events-none absolute top-0 bottom-0 right-0 flex items-center justify-center text-gray-500',
          selectSizes[size]['chevron']
        )}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg"
          width={'1em'}
          height={'1em'}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});

NativeSelect.displayName = 'NativeSelect';
