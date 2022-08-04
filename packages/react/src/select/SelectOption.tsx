import { useMergedRefs } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import type { KeyboardEvent, ReactNode } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useSelect } from './SelectProvider';

export type SelectOptionProps = {
  value: StringOrNumber;
  label?: ReactNode;
  disabled?: boolean;
  index?: number;
};

export const SelectOption = primitiveComponent<'li', SelectOptionProps>((props, ref) => {
  const { children, value, className, disabled = false, index = 0, ...rest } = props;

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

  const handleSelect = () => {
    setSelectedIndex(index);
    onChange && onChange(value);
    setOpen(false);
    setActiveIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || (e.key === ' ' && !dataRef.current.typing)) {
      e.preventDefault();
      handleSelect();
    }
  };

  const refs = useMergedRefs(ref, (node) => {
    listRef.current[index] = node;
  });

  return (
    <li
      ref={refs}
      role="option"
      aria-selected={ariaAttr(activeIndex == index && selectedIndex == index)}
      data-selected={dataAttr(selectedIndex == index)}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      tabIndex={activeIndex === index ? 0 : 1}
      className={cx(
        'flex select-none w-full outline-none whitespace-nowrap items-center rounded focus:bg-gray-100 dark:focus:bg-gray-600 selected:bg-blue-100 dark:selected:bg-blue-600',
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
