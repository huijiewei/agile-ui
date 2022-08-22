import { useMergedRefs } from '@agile-ui/react-hooks';
import type { Dict } from '@agile-ui/utils';
import { ariaAttr, dataAttr } from '@agile-ui/utils';
import type { ReactNode } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useSelect } from './SelectProvider';
import type { Size } from '../utils/types';

export type SelectOptionProps = {
  /**
   * 选项值
   */
  value: string | number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 选项回显内容
   */
  label?: ReactNode;

  /**
   * 携带任意数据
   */
  extra?: Dict;

  /**
   * @ignore
   */
  index?: number;

  /**
   * @ignore
   */
  size?: Size;
};

export const SelectOption = primitiveComponent<'li', SelectOptionProps>((props, ref) => {
  const { children, value, className, disabled = false, index = 0, ...rest } = props;

  const { selectedIndex, onSelected, listRef, activeIndex, getItemProps, sizeClass } = useSelect();

  const refs = useMergedRefs(ref, (node) => {
    listRef.current[index] = node;
  });

  return (
    <li
      ref={refs}
      role="option"
      data-active={dataAttr(activeIndex == index)}
      aria-selected={ariaAttr(activeIndex == index && selectedIndex.includes(index))}
      data-selected={dataAttr(selectedIndex.includes(index))}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      tabIndex={activeIndex == index ? 0 : 1}
      className={cx(
        'select-none w-full outline-none transition-colors rounded selected:text-blue-500',
        disabled ? 'opacity-60' : 'active:bg-gray-100 dark:active:bg-gray-600',
        sizeClass,
        className
      )}
      {...getItemProps({
        onClick: () => {
          if (disabled) {
            return;
          }

          onSelected(value);
        },
      })}
      {...rest}
    >
      {children}
    </li>
  );
});

SelectOption.displayName = 'SelectOption';
