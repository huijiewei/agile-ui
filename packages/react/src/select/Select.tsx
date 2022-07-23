import { useAnimation, useControllableProp, usePrevious } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { dataAttr } from '@agile-ui/utils';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  size as floatingSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react-dom-interactions';
import { Children, cloneElement, isValidElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { cx } from 'twind';
import type { AnimationBaseProps } from '../animation/Animation';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';
import { SelectProvider } from './SelectProvider';

export type SelectProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean;

  /**
   * 是否可以清除内容
   * @default false
   */
  clearable?: boolean;

  /**
   * 占位符
   */
  placeholder?: ReactNode;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 是否未通过验证
   * @default false
   */
  invalid?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 默认开启状态
   */
  opened?: boolean;

  value?: Readonly<StringOrNumber[]> | StringOrNumber | null;

  defaultValue?: Readonly<StringOrNumber[]> | StringOrNumber | null;

  onChange?: (value: Readonly<StringOrNumber[]> | StringOrNumber | null) => void;

  /**
   * 动画
   */
  animation?: AnimationBaseProps;
};

const selectSizes = {
  xs: 'h-6 leading-6 px-2 text-sm',
  sm: 'h-7 leading-7 px-2',
  md: 'h-8 leading-8 px-3',
  lg: 'h-9 leading-9 px-3',
  xl: 'h-10 leading-10 px-3 text-lg',
};

export const Select = primitiveComponent<'select', SelectProps>((props, ref) => {
  const {
    size = 'md',
    placeholder,
    value,
    defaultValue,
    children,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    disabled = false,
    clearable = false,
    multiple = false,
    opened = false,
    animation,
    className,
    fullWidth = false,
    ...rest
  } = props;

  const [valueState, setValueState] = useState(defaultValue);

  const [isControlled, controlledValue] = useControllableProp(value, valueState);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const listContentRef = useRef([
    placeholder,
    ...(Children.map(children, (child) => isValidElement(child) && child.props.value) ?? []),
  ]);

  const [open, setOpen] = useState(opened);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(Math.max(0, listContentRef.current.indexOf(controlledValue) - 1));

  const [controlledScrolling, setControlledScrolling] = useState(false);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const { x, y, reference, floating, context, refs, middlewareData } = useFloating({
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 8,
      }),
    ],
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
  });

  const floatingRef = refs.floating;

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: open ? setActiveIndex : setSelectedIndex,
      activeIndex,
      selectedIndex,
    }),
  ]);

  useLayoutEffect(() => {
    const floating = floatingRef.current;

    if (open && controlledScrolling && floating) {
      const item =
        activeIndex != null
          ? listItemsRef.current[activeIndex]
          : selectedIndex != null
          ? listItemsRef.current[selectedIndex]
          : null;

      if (item && prevActiveIndex != null) {
        const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;

        const floatingHeight = floating.offsetHeight;
        const top = item.offsetTop;
        const bottom = top + itemHeight;

        if (top < floating.scrollTop) {
          floating.scrollTop -= floating.scrollTop - top + 5;
        } else if (bottom > floatingHeight + floating.scrollTop) {
          floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 5;
        }
      }
    }
  }, [open, controlledScrolling, prevActiveIndex, activeIndex, floatingRef, selectedIndex]);

  useLayoutEffect(() => {
    const floating = refs.floating.current;
    if (open && floating && floating.offsetHeight < floating.scrollHeight) {
      const item = listItemsRef.current[selectedIndex];
      if (item) {
        floating.scrollTop = item.offsetTop - floating.offsetHeight / 2 + item.offsetHeight / 2;
      }
    }
  }, [open, selectedIndex, refs.floating, refs.reference, middlewareData]);

  const { duration, transition, enter, exit } = {
    duration: 200,
    enter: 'opacity-100',
    exit: 'opacity-0',
    transition: 'transition-opacity',
    ...animation,
  };
  const { stage, shouldMount } = useAnimation(open, duration);

  return (
    <SelectProvider
      value={{
        selectedIndex,
        setSelectedIndex,
        activeIndex,
        setActiveIndex,
        listRef: listItemsRef,
        setOpen,
        onChange,
        getItemProps,
        dataRef: context.dataRef,
        selectSize: selectSizes[size],
      }}
    >
      <button
        data-active={dataAttr(open)}
        className={cx(
          'inline-flex items-center border bg-white relative rounded transition-colors cursor-default outline-none',
          disabled ? 'opacity-50 cursor-not-allowed' : !open && 'hover:(border-gray-300 z-[2])',
          open ? !disabled && 'border-blue-500 z-[1]' : 'border-gray-200 ',
          fullWidth ? 'w-full' : 'w-fit',
          selectSizes[size],
          className
        )}
        {...getReferenceProps({
          ref: reference,
        })}
      >
        {selectedIndex >= 0 ? listContentRef.current[selectedIndex + 1] : placeholder}
        <span className={'ml-1'}>
          <svg
            width={'1em'}
            height={'1em'}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <Portal>
        {shouldMount && (
          <FloatingFocusManager context={context} preventTabbing>
            <ul
              className={cx(
                'overflow-y-auto absolute z-10 shadow rounded border outline-none w-auto p-1.5 w-auto border-gray-200 bg-white dark:bg-gray-700',
                '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])',
                `duration-[${duration}ms] ${transition}`,
                stage == 'enter' ? enter : exit
              )}
              {...getFloatingProps({
                ref: floating,
                style: {
                  top: y ?? 0,
                  left: x ?? 0,
                },
              })}
            >
              {Children.map(children, (child, index) => {
                if (isValidElement(child)) {
                  return cloneElement(child, { index });
                }

                return child;
              })}
            </ul>
          </FloatingFocusManager>
        )}
      </Portal>
    </SelectProvider>
  );
});
