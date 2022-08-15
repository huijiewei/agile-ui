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
import { useVirtualizer } from '@tanstack/react-virtual';

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
   * 是否可清除内容
   * @default false
   */
  clearable?: boolean;

  /**
   * 是否可搜索
   * @default false
   */
  searchable?: boolean;

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

  /**
   * 可控值
   */
  value?: StringOrNumber[] | StringOrNumber;

  /**
   * 非可控默认值
   */
  defaultValue?: StringOrNumber[] | StringOrNumber;

  /**
   * 选择后关闭
   * @default true
   */
  closeOnSelect?: boolean;

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
  xs: {
    base: 'py-px text-sm',
    select: 'pl-2 pr-1 gap-2',
    option: 'px-2',
    height: 22,
  },
  sm: {
    base: 'py-0.5',
    select: 'pl-2 pr-1 gap-2',
    option: 'px-2',
    height: 26,
  },
  md: {
    base: 'py-1',
    select: 'pl-3 pr-1.5 gap-3',
    option: 'px-3',
    height: 30,
  },
  lg: {
    base: 'py-1.5',
    select: 'pl-3 pr-1.5 gap-3',
    option: 'px-3',
    height: 34,
  },
  xl: {
    base: 'py-[7px] text-lg',
    select: 'pl-3 pr-1.5 gap-3',
    option: 'px-3',
    height: 38,
  },
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
    searchable = false,
    opened = false,
    className,
    fullWidth = false,
    value,
    defaultValue = multiple ? [] : undefined,
    closeOnSelect = true,
    style,
    ...rest
  } = props;

  const [virtual, setVirtual] = useState(false);

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
                  label: groupChild.props.label ?? groupChild.props.children,
                };
              } else {
                cacheData.elements.push(groupChild);
              }
            }
          });
        } else if (child.type == SelectOption) {
          optionIndex++;

          cacheData.elements.push(
            cloneElement(child, {
              index: optionIndex,
              key: getChildKey(child.props.value, child.key),
            })
          );

          cacheData.options[optionIndex] = {
            value: child.props.value,
            label: child.props.label ?? child.props.children,
          };
        } else {
          cacheData.elements.push(child);
        }
      }
    });

    setVirtual(cacheData.elements.length > 30 && cacheData.elements.length == cacheData.options.length - 1);

    return cacheData;
  }, [children, placeholder]);

  const [valueState, setValueState] = useState(defaultValue);

  const [controlled, controlledValue] = useControllableProp(value, valueState);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([...Array(options.length).fill(null)]);
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

        if (!controlled) {
          setValueState(nextValue);
        }

        onChange && onChange(nextValue);
      } else {
        setSelectedIndex([index]);

        if (!controlled) {
          setValueState(value);
        }

        onChange && onChange(value);
      }
    },
    [controlled, multiple, onChange, valueState]
  );

  const handleClear = useCallback(() => {
    if (multiple) {
      setSelectedIndex([]);

      if (!controlled) {
        setValueState([]);
      }
    } else {
      setSelectedIndex([0]);

      if (!controlled) {
        setValueState(undefined);
      }
    }

    onClear && onClear();
  }, [controlled, multiple, onClear]);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const { x, y, reference, floating, context, refs, middlewareData } = useFloating<HTMLElement>({
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
      loop: true,
      virtual,
      disabledIndices: virtual ? [0] : undefined,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: setActiveIndex,
      activeIndex,
      selectedIndex: minSelectedIndex,
    }),
  ]);

  const sizeClass = selectSizes[size];

  const rowVirtual = useVirtualizer({
    count: elements.length,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => sizeClass.height,
    overscan: 3,
    enableSmoothScroll: false,
    paddingStart: 6,
    paddingEnd: 6,
    scrollPaddingStart: 6,
    scrollPaddingEnd: 6,
  });

  const [controlledScrolling, setControlledScrolling] = useState(false);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    if (!controlledScrolling) {
      return;
    }

    if (virtual) {
      const scrollIndex = activeIndex != null ? activeIndex : minSelectedIndex != null ? minSelectedIndex - 1 : 0;

      if (scrollIndex > 0 && prevActiveIndex != null) {
        rowVirtual.scrollToIndex(scrollIndex > prevActiveIndex ? scrollIndex : scrollIndex - 2, {
          align: 'auto',
        });
      }
    } else {
      const floating = refs.floating.current;

      if (floating) {
        const item =
          activeIndex != null
            ? listItemsRef.current[activeIndex]
            : minSelectedIndex != null
            ? listItemsRef.current[minSelectedIndex]
            : null;

        if (item && prevActiveIndex != null) {
          const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;

          const floatingHeight = floating.offsetHeight;
          const top = item.offsetTop - itemHeight;
          const bottom = top + itemHeight * 3;

          if (top < floating.scrollTop) {
            floating.scrollTop -= floating.scrollTop - top + 6;
          } else if (bottom > floatingHeight + floating.scrollTop) {
            floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 6;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, controlledScrolling, prevActiveIndex, activeIndex, minSelectedIndex, refs.floating, virtual]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    if (virtual) {
      if (minSelectedIndex > 1) {
        rowVirtual.scrollToIndex(minSelectedIndex, { align: 'center' });
      }
    } else {
      const floating = refs.floating.current;

      if (floating && floating.offsetHeight < floating.scrollHeight) {
        const item = listItemsRef.current[minSelectedIndex];

        if (item) {
          floating.scrollTop = item.offsetTop - floating.offsetHeight / 2 + item.offsetHeight / 2 + 9;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, minSelectedIndex, middlewareData, refs.floating, virtual]);

  const showClearButton =
    clearable && (Array.isArray(controlledValue) ? controlledValue.length > 0 : controlledValue !== undefined);

  const { id: floatingId, ...floatingRest } = getFloatingProps({
    tabIndex: 0,
    onPointerMove() {
      setControlledScrolling(false);
    },
    onKeyDown(event) {
      setControlledScrolling(true);

      if (virtual) {
        if (event.key === 'Enter' || (event.key === ' ' && !context.dataRef.current.typing)) {
          event.preventDefault();

          if (activeIndex) {
            handleSelected(activeIndex, elements[activeIndex].props.value);
            closeOnSelect && setOpen(false);
            setActiveIndex(null);
          }
        }
      }
    },
  });

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
        sizeClass: [sizeClass['base'], sizeClass['option']],
        closeOnSelect,
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
          'inline-flex items-center h-fit border border-gray-200 bg-white relative rounded transition-colors outline-none',
          invalid && 'border-red-500',
          disabled
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'cursor-default active:(border-blue-500 z-[1]) focus-visible:(border-blue-500)',
          !invalid && !disabled && 'hover:(border-gray-300 z-[2])',
          fullWidth ? 'w-full' : '',
          sizeClass['base'],
          sizeClass['select'],
          className
        )}
        {...getReferenceProps({
          role: 'combobox',
          style: style,
          ref: reference,
        })}
      >
        <div className={'flex-1 select-none'}>
          {multiple ? (
            selectedIndex.length > 0 ? (
              <div className={cx('flex flex-wrap gap-1', (size == 'xs' || size == 'sm') && 'gap-y-0.5')}>
                {selectedIndex.map((index) => (
                  <span className={'bg-gray-100 leading-none items-center rounded-sm flex gap-1 pl-2 p-1'} key={index}>
                    {options[index].label}
                    <CloseButton
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSelected(index, options[index].value as StringOrNumber);
                      }}
                      className={'hover:bg-gray-50 rounded-full'}
                    />
                  </span>
                ))}
              </div>
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
              onClick={(event) => {
                event.stopPropagation();
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
            <FloatingFocusManager context={context} preventTabbing={!virtual}>
              <Motion
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cx(
                  'absolute z-50 shadow rounded border outline-none border-gray-200 bg-white dark:bg-gray-700 max-h-80 overflow-y-auto overscroll-contain scrollbar-thin',
                  virtual ? 'px-1.5' : 'p-1.5'
                )}
                ref={floating}
                style={{
                  top: y ?? 0,
                  left: x ?? 0,
                  height: virtual ? '320px' : undefined,
                }}
              >
                <ul
                  id={floatingId as string}
                  className={'outline-none'}
                  style={
                    virtual
                      ? { height: `${rowVirtual.getTotalSize()}px`, width: '100%', position: 'relative' }
                      : undefined
                  }
                  {...floatingRest}
                >
                  {virtual
                    ? rowVirtual.getVirtualItems().map((row) =>
                        cloneElement(elements[row.index], {
                          id: `${floatingId}-${row.index}`,
                          ref: row.measureElement,
                          style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: `${row.size}px`,
                            transform: `translateY(${row.start}px)`,
                          },
                        })
                      )
                    : elements}
                </ul>
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
