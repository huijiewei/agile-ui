import { useControllableProp, usePrevious } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
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
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  Key,
  ReactElement,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';
import { SelectProvider } from './SelectProvider';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';
import { SelectOptionGroup } from './SelectOptionGroup';
import { SelectOption } from './SelectOption';
import { CloseButton } from '../close-button/CloseButton';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

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
  placeholder?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必选
   * @default false
   */
  required?: boolean;

  /**
   * 是否未通过验证
   * @default false
   */
  invalid?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 默认开启状态
   */
  opened?: boolean;

  value?: StringOrNumber[] | StringOrNumber;

  defaultValue?: StringOrNumber[] | StringOrNumber;

  /**
   * 值改变时触发回调
   */
  onChange?: (value: StringOrNumber[] | StringOrNumber | undefined) => void;

  /**
   * 点击清除按钮的回调
   */
  onClear?: () => void;
};

const selectSizes = {
  xs: 'h-6 leading-6 pl-2 pr-1 text-sm gap-2',
  sm: 'h-7 leading-7 pl-2 pr-1 gap-2',
  md: 'h-8 leading-8 pl-3 pr-1.5 gap-3',
  lg: 'h-9 leading-9 pl-3 pr-1.5 gap-3',
  xl: 'h-10 leading-10 pl-3 pr-1.5 text-lg gap-3',
};

export const Select = primitiveComponent<'input', SelectProps>((props, ref) => {
  const {
    id,
    size = 'md',
    placeholder = '选择器',
    children,
    onChange,
    onClear,
    disabled = false,
    required = false,
    invalid = false,
    multiple = false,
    clearable = false,
    opened = false,
    className,
    fullWidth = false,
    value,
    defaultValue = multiple ? [] : undefined,
    style,
    ...rest
  } = props;

  const { elements, options } = useMemo(() => {
    let optionIndex = 0;

    const cacheData: {
      elements: ReactElement[];
      options: { value: StringOrNumber | undefined; label: ReactNode }[];
    } = {
      elements: [],
      options: [{ value: undefined, label: placeholder }],
    };

    const getChildKey = (value: StringOrNumber, key: Key | null) => {
      if (key) {
        return key;
      }

      if (value) {
        return value;
      }

      return Math.random().toString(36).slice(-6);
    };

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type == SelectOptionGroup) {
          Children.forEach(child.props.children, (groupChild: ReactNode) => {
            if (isValidElement(groupChild)) {
              if (groupChild.type == SelectOption) {
                optionIndex++;

                cacheData.elements.push(
                  cloneElement(groupChild, {
                    index: optionIndex,
                    key: getChildKey(groupChild.props.value, groupChild.key),
                  })
                );

                cacheData.options[optionIndex] = {
                  value: groupChild.props.value,
                  label: groupChild.props.label ? groupChild.props.label : groupChild.props.children,
                };
              } else {
                cacheData.elements.push(groupChild);
              }
            }
          });
        } else if (child.type == SelectOption) {
          optionIndex++;

          cacheData.elements.push(
            cloneElement(child, { index: optionIndex, key: getChildKey(child.props.value, child.key) })
          );

          cacheData.options[optionIndex] = {
            value: child.props.value,
            label: child.props.label ? child.props.label : child.props.children,
          };
        } else {
          cacheData.elements.push(child);
        }
      }
    });

    return cacheData;
  }, [children, placeholder]);

  const [valueState, setValueState] = useState(defaultValue);

  const [isControlled, controlledValue] = useControllableProp(value, valueState);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const listContentRef = useRef<string[]>(options.map((option) => option.value?.toString() || ''));

  const [open, setOpen] = useState(opened);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number[]>(() => {
    if (Array.isArray(controlledValue)) {
      return controlledValue.map((v) => listContentRef.current.indexOf(v.toString()));
    } else {
      return [listContentRef.current.indexOf(controlledValue?.toString() || '')];
    }
  });

  const handleSelected = useCallback(
    (index: number, value: StringOrNumber) => {
      if (multiple) {
        setSelectedIndex((prev) => {
          if (prev.includes(index)) {
            return prev.filter((p) => p != index);
          } else {
            return [...prev, index];
          }
        });

        const prevValue = valueState as StringOrNumber[];

        const nextValue = prevValue.includes(value) ? prevValue.filter((p) => p != value) : [...prevValue, value];

        if (!isControlled) {
          setValueState(nextValue);
        }

        onChange && onChange(nextValue);
      } else {
        setSelectedIndex([index]);

        if (!isControlled) {
          setValueState(value);
        }

        onChange && onChange(value);
      }
    },
    [isControlled, multiple, onChange, valueState]
  );

  const handleClear = useCallback(() => {
    if (multiple) {
      setSelectedIndex([]);

      if (!isControlled) {
        setValueState([]);
      }
    } else {
      setSelectedIndex([0]);

      if (!isControlled) {
        setValueState(undefined);
      }
    }

    onClear && onClear();
  }, [isControlled, multiple, onClear]);

  const [controlledScrolling, setControlledScrolling] = useState(false);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const { x, y, reference, floating, context, middlewareData } = useFloating<HTMLElement>({
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ availableWidth, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 8,
      }),
    ],
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
  });

  const minSelectedIndex = useMemo(() => {
    return Math.min(...selectedIndex);
  }, [selectedIndex]);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex: minSelectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: setActiveIndex,
      activeIndex,
      selectedIndex: minSelectedIndex,
    }),
  ]);

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    if (!controlledScrolling) {
      return;
    }

    if (scrollerRef.current) {
      const item =
        activeIndex != null
          ? listItemsRef.current[activeIndex]
          : minSelectedIndex != null
          ? listItemsRef.current[minSelectedIndex]
          : null;

      if (item && prevActiveIndex != null) {
        const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;

        const floatingHeight = scrollerRef.current.offsetHeight;
        const top = item.offsetTop;
        const bottom = top + itemHeight;

        if (top < scrollerRef.current.scrollTop) {
          scrollerRef.current.scrollTop -= scrollerRef.current.scrollTop - top + 5;
        } else if (bottom > floatingHeight + scrollerRef.current.scrollTop) {
          scrollerRef.current.scrollTop += bottom - floatingHeight - scrollerRef.current.scrollTop + 5;
        }
      }
    }
  }, [open, controlledScrolling, prevActiveIndex, activeIndex, minSelectedIndex]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({ index: minSelectedIndex, align: 'start', behavior: 'auto' });

      return;
    }

    const item = listItemsRef.current[minSelectedIndex];

    if (item && scrollerRef.current && scrollerRef.current.offsetHeight < scrollerRef.current.scrollHeight) {
      scrollerRef.current.scrollTop = item.offsetTop - scrollerRef.current.offsetHeight / 2 + item.offsetHeight / 2;
    }
  }, [open, minSelectedIndex, middlewareData]);

  const showClearButton =
    clearable && (Array.isArray(controlledValue) ? controlledValue.length > 0 : controlledValue !== undefined);

  return (
    <SelectProvider
      value={{
        selectedIndex,
        onSelected: handleSelected,
        activeIndex,
        setActiveIndex,
        listRef: listItemsRef,
        setOpen,
        getItemProps,
        dataRef: context.dataRef,
        selectSize: selectSizes[size],
      }}
    >
      <div
        id={id}
        aria-haspopup={'listbox'}
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        data-active={dataAttr(open)}
        data-disabled={dataAttr(disabled)}
        aria-disabled={ariaAttr(disabled)}
        aria-required={ariaAttr(required)}
        className={cx(
          'inline-flex items-center border border-gray-200 bg-white relative rounded transition-colors outline-none',
          invalid && 'border-red-500',
          disabled
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'cursor-default active:(border-blue-500 z-[1]) focus-visible:(border-blue-500)',
          !invalid && !disabled && 'hover:(border-gray-300 z-[2])',
          fullWidth ? 'w-full' : '',
          selectSizes[size],
          className
        )}
        {...getReferenceProps({
          role: 'combobox',
          style: style,
          ref: reference,
        })}
      >
        <div className={'flex flex-1 gap-1 items-center select-none'}>
          {multiple ? (
            selectedIndex.length > 0 ? (
              selectedIndex.map((index) => (
                <span className={'bg-gray-100 leading-none rounded-sm flex gap-1 pl-2 p-1'} key={index}>
                  {options[index].label}
                  <CloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelected(index, options[index].value as StringOrNumber);
                    }}
                    className={'hover:bg-gray-50 rounded-full'}
                  />
                </span>
              ))
            ) : (
              <span className={'text-gray-500'}>{placeholder}</span>
            )
          ) : selectedIndex[0] > 0 ? (
            options[selectedIndex[0]].label
          ) : (
            <span className={'text-gray-500'}>{placeholder}</span>
          )}
        </div>
        <div className={'flex gap-1 items-center'}>
          {showClearButton && (
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className={'text-gray-500 rounded-full p-0.5 hover:bg-gray-100'}
            />
          )}
          <span className={'text-gray-500'}>
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
          </span>
        </div>
        {Array.isArray(controlledValue) ? (
          controlledValue.map((v, i) => <input key={i} type={'hidden'} ref={ref} value={v} {...rest} />)
        ) : (
          <input type={'hidden'} ref={ref} value={controlledValue || ''} {...rest} />
        )}
      </div>
      <Portal>
        <AnimatePresence>
          {open && (
            <FloatingFocusManager context={context} preventTabbing>
              <Motion
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={'absolute z-10 shadow rounded border outline-none border-gray-200 bg-white dark:bg-gray-700'}
                {...getFloatingProps({
                  ref: floating,
                  style: {
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                  onPointerEnter() {
                    setControlledScrolling(false);
                  },
                  onPointerMove() {
                    setControlledScrolling(false);
                  },
                  onKeyDown() {
                    setControlledScrolling(true);
                  },
                })}
              >
                {elements.length > 30 ? (
                  <Virtuoso
                    ref={virtuosoRef}
                    className={'scrollbar-thin overscroll-contain'}
                    style={{ height: '320px' }}
                    totalCount={elements.length}
                    components={{
                      Header: () => <div className={'h-1.5'}></div>,
                      Footer: () => <div className={'h-1.5'}></div>,
                      // eslint-disable-next-line react/display-name
                      List: forwardRef(({ children, ...rest }, ref) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <ul className={'px-1.5'} ref={ref} {...rest}>
                          {children}
                        </ul>
                      )),
                      // eslint-disable-next-line react/display-name
                      Item: forwardRef(({ children, ...rest }, ref) =>
                        cloneElement(children as ReactElement, { ref, ...rest })
                      ),
                    }}
                    itemContent={(index) => elements[index]}
                  />
                ) : (
                  <ul
                    ref={scrollerRef}
                    className={'relative p-1.5 max-h-80 overflow-y-auto overscroll-contain scrollbar-thin'}
                  >
                    {elements}
                  </ul>
                )}
              </Motion>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </Portal>
    </SelectProvider>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}
