import { useMergedRefs } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import type { KeyboardEvent, ReactNode } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useSelect } from './SelectProvider';
import { useCallback } from 'react';
import type { Size } from '../utils/types';

export type SelectOptionProps = {
  /**
   * 选项值
   */
  value: StringOrNumber;

  /**
   * 选项回显内容
   */
  label?: ReactNode;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

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

  const {
    selectedIndex,
    onSelected,
    listRef,
    setOpen,
    activeIndex,
    setActiveIndex,
    getItemProps,
    dataRef,
    sizeClass,
    closeOnSelect,
  } = useSelect();

  const handleSelect = useCallback(() => {
    onSelected(index, value);
    closeOnSelect && setOpen(false);
    setActiveIndex(null);
  }, [closeOnSelect, index, onSelected, setActiveIndex, setOpen, value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || (event.key === ' ' && !dataRef.current.typing)) {
        event.preventDefault();
        handleSelect();
      }
    },
    [dataRef, handleSelect]
  );

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
        'select-none w-full h-fit outline-none transition-colors rounded active:bg-gray-100 dark:active:bg-gray-600 selected:text-blue-500',
        sizeClass,
        className
      )}
      {...getItemProps({
        onClick: handleSelect,
        onKeyDown: handleKeyDown,
      })}
      {...rest}
    >
      {children}
    </li>
  );
});

if (__DEV__) {
  SelectOption.displayName = 'SelectOption';
}
