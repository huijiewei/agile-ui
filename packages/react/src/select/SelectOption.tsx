import { useMergedRefs } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import type { KeyboardEvent, ReactNode } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useSelect, useSelectOptionIndex } from './SelectProvider';

export type SelectOptionProps = {
  value: StringOrNumber;
  label: ReactNode;
  disabled?: boolean;
};

export const SelectOption = primitiveComponent<'li', SelectOptionProps>((props, ref) => {
  const { children, value, className, disabled = false, ...rest } = props;

  const {
    selectedIndex,
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndex,
    setActiveIndex,
    getItemProps,
    dataRef,
    selectSize,
  } = useSelect();

  const optionIndex = useSelectOptionIndex();

  const handleSelect = () => {
    setSelectedIndex(optionIndex);
    onChange(value);
    setOpen(false);
    setActiveIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || (e.key === ' ' && !dataRef.current.typing)) {
      e.preventDefault();
      handleSelect();
    }
  };

  const refs = useMergedRefs(ref, (node) => (listRef.current[optionIndex] = node));

  return (
    <li
      ref={refs}
      role="option"
      aria-selected={ariaAttr(activeIndex == optionIndex && selectedIndex == optionIndex)}
      data-selected={dataAttr(selectedIndex == optionIndex)}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      tabIndex={activeIndex === optionIndex ? 0 : 1}
      className={cx(
        'flex select-none w-full outline-none relative items-center rounded focus:bg-gray-100 dark:focus:bg-gray-600 selected:bg-blue-100 dark:selected:bg-blue-600',
        selectSize,
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
