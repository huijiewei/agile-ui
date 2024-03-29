import { useCallbackRef, useControllableProp, useFocus, useMergedRefs, usePrevious } from '@agile-ui/react-hooks';
import { ariaAttr, dataAttr } from '@agile-ui/utils';
import {
  autoUpdate,
  flip,
  offset,
  size as floatingSize,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useClick,
} from '@floating-ui/react';
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cx } from '@twind/core';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';
import { SelectProvider } from './SelectProvider';
import { AnimatePresence } from 'framer-motion';
import { getMotionProps, Motion, MotionComponentProps } from '../motion/Motion';
import { SelectOptionGroup } from './SelectOptionGroup';
import { SelectOption } from './SelectOption';
import { CloseButton } from '../close-button/CloseButton';
import { useVirtualizer } from '@tanstack/react-virtual';
import { SelectChevron } from './SelectChevron';
import { SelectSearch } from './SelectSearch';

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
   * 自定义搜索方法
   * @type (keyword: string, option: ReactElement) => boolean;
   */
  filter?: (keyword: string, option: ReactElement) => boolean;

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
  value?: (string | number)[] | string | number;

  /**
   * 非可控默认值
   */
  defaultValue?: (string | number)[] | string | number;

  /**
   * 选择后关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 值改变时触发回调
   */
  onChange?: (value: (string | number)[] | string | number) => void;

  /**
   * 点击清除按钮的回调
   */
  onClear?: () => void;

  /**
   * 搜索框框值变化时回调
   */
  onSearch?: (value: string) => void;
} & MotionComponentProps;

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
    filter = (keyword, option) => {
      return option.props.value.toString().toLowerCase().indexOf(keyword.toLowerCase()) != -1;
    },
    opened = false,
    className,
    fullWidth = false,
    value,
    defaultValue = multiple ? [] : undefined,
    closeOnSelect = true,
    style,
    motionPreset = 'fade',
    motionProps,
    ...rest
  } = props;

  const [virtual, setVirtual] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchInputHidden, setSearchInputHidden] = useState(false);

  const filterRef = useCallbackRef(filter);

  const { elements, options } = useMemo(() => {
    let optionIndex = 0;

    const cacheData: {
      elements: ReactElement[];
      options: Map<string | number, { label: ReactNode; index: number }>;
    } = {
      elements: [],
      options: new Map(),
    };

    const pushChild = (child: ReactElement) => {
      let index = -1;

      if (!searchable || searchValue == '' || filterRef(searchValue, child)) {
        index = optionIndex;

        cacheData.elements.push(
          cloneElement(child, {
            key: child.key || child.props.value || Math.random().toString(36).slice(-6),
            index: optionIndex,
            label: undefined,
            extra: undefined,
          })
        );

        optionIndex++;
      }

      cacheData.options.set(child.props.value, {
        label: child.props.label || child.props.children,
        index,
      });
    };

    let optionCount = 0;
    let elementCount = 0;

    Children.forEach(children, (child) => {
      elementCount++;

      if (isValidElement(child)) {
        if (child.type == SelectOptionGroup) {
          Children.forEach(child.props.children, (groupChild: ReactNode) => {
            if (isValidElement(groupChild)) {
              if (groupChild.type == SelectOption) {
                optionCount++;
                pushChild(groupChild);
              } else {
                cacheData.elements.push(groupChild);
              }
            }
          });
        } else if (child.type == SelectOption) {
          optionCount++;
          pushChild(child);
        } else {
          cacheData.elements.push(child);
        }
      }
    });

    setVirtual(optionCount > 30 && optionCount == elementCount);

    return cacheData;
  }, [children, filterRef, searchValue, searchable]);

  const [valueState, setValueState] = useState(defaultValue);

  const [controlled, controlledValue] = useControllableProp(value, valueState);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([...Array(options.size).fill(null)]);

  const [open, setOpen] = useState(opened);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedIndex = useMemo(() => {
    if (Array.isArray(controlledValue)) {
      return controlledValue.map((value) => options.get(value)?.index ?? -1);
    } else {
      return [controlledValue != undefined ? options.get(controlledValue)?.index ?? -1 : -1];
    }
  }, [controlledValue, options]);

  const { x, y, context, refs, middlewareData } = useFloating<HTMLElement>({
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
    onOpenChange: (opened) => {
      if (opened) {
        setSearchInputHidden(false);
      }

      setOpen(opened);
    },
    whileElementsMounted: autoUpdate,
  });

  const handleSelected = useCallback(
    (value: string | number, close = true) => {
      const multiple = Array.isArray(controlledValue);

      const nextValue = multiple
        ? controlledValue.includes(value)
          ? controlledValue.filter((p) => p != value)
          : [...controlledValue, value]
        : value;

      if (!controlled) {
        setValueState(nextValue);
      }

      if (closeOnSelect && close) {
        setOpen(false);

        if (!multiple) {
          setSearchInputHidden(true);
        }

        setActiveIndex(null);
      }

      searchable && setSearchValue('');

      onChange && onChange(nextValue);

      requestAnimationFrame(() => {
        refs.domReference.current?.focus();
      });
    },
    [closeOnSelect, controlled, controlledValue, onChange, refs.domReference, searchable]
  );

  const handleClear = useCallback(() => {
    if (multiple) {
      if (!controlled) {
        setValueState([]);
      }
    } else {
      if (!controlled) {
        setValueState(undefined);
      }
    }

    onClear && onClear();
  }, [controlled, multiple, onClear]);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const minSelectedIndex = useMemo(() => {
    return Math.min(...selectedIndex);
  }, [selectedIndex]);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { keyboardHandlers: closeOnSelect }),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex: minSelectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
      virtual: true,
      disabledIndices: [],
    }),
  ]);

  const sizeClass = selectSizes[size];

  const rowVirtual = useVirtualizer({
    count: elements.length,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => sizeClass.height,
    overscan: 3,
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
      const scrollIndex = activeIndex != null ? activeIndex : minSelectedIndex != null ? minSelectedIndex - 1 : -1;

      if (scrollIndex > -1 && prevActiveIndex != null) {
        rowVirtual.scrollToIndex(scrollIndex > prevActiveIndex ? scrollIndex + 1 : scrollIndex - 1, {
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
          const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight || 0;

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
    if (!open || !closeOnSelect) {
      return;
    }

    requestAnimationFrame(() => {
      if (virtual) {
        if (minSelectedIndex > -1) {
          rowVirtual.scrollToIndex(minSelectedIndex + 1, { align: 'center' });
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, minSelectedIndex, middlewareData, refs.floating, virtual]);

  const showClearButton =
    clearable && (Array.isArray(controlledValue) ? controlledValue.length > 0 : controlledValue != undefined);

  const { id: floatingId, ...floatingRest } = getFloatingProps({
    tabIndex: 0,
    onPointerMove() {
      setControlledScrolling(false);
    },
    onKeyDown() {
      setControlledScrolling(true);
    },
  });

  const [searchInputFocusRef, searchInputFocus] = useFocus();
  const searchInputRefs = useMergedRefs(searchInputRef, searchInputFocusRef);

  const renderSingleValue = (controlledValue: string | number | undefined) => {
    return (
      <div className={'grid flex-1 flex-wrap'}>
        {searchValue == '' &&
          (controlledValue != undefined ? (
            <div className={'col-start-1 col-end-3 row-start-1 row-end-2'}>{options.get(controlledValue)?.label}</div>
          ) : (
            <span className={'col-start-1 col-end-3 row-start-1 row-end-2 text-gray-500'}>{placeholder}</span>
          ))}
        {searchable && (
          <SelectSearch
            ref={searchInputRefs}
            open={open}
            setOpen={setOpen}
            setActiveIndex={setActiveIndex}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            hidden={searchInputHidden}
            setHidden={setSearchInputHidden}
          />
        )}
      </div>
    );
  };

  const renderMultipleValue = (controlledValue: (string | number)[]) => {
    return (
      <div
        className={cx(
          'flex-1 flex-wrap gap-1',
          controlledValue.length > 0 ? 'flex' : 'grid',
          (size == 'xs' || size == 'sm') && 'gap-y-0.5'
        )}
      >
        {controlledValue.length > 0
          ? controlledValue.map((value) => (
              <span className={'flex items-center gap-1 rounded-sm bg-gray-100 p-1 pl-2 leading-none'} key={value}>
                {options.get(value)?.label}
                <CloseButton
                  aria-label={`Remove ${value}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelected(value);
                  }}
                  className={'rounded-full hover:bg-gray-50'}
                />
              </span>
            ))
          : searchValue == '' && (
              <span className={'col-start-1 col-end-3 row-start-1 row-end-2 text-gray-500'}>{placeholder}</span>
            )}
        {searchable && (
          <SelectSearch
            ref={searchInputRefs}
            open={open}
            setOpen={setOpen}
            setActiveIndex={setActiveIndex}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            hidden={searchInputHidden}
            setHidden={setSearchInputHidden}
          />
        )}
      </div>
    );
  };

  const [focusRef, focus] = useFocus();

  const referenceRefs = useMergedRefs(refs.setReference, focusRef);

  return (
    <SelectProvider
      value={{
        activeIndex,
        selectedIndex,
        onSelected: handleSelected,
        listRef: listItemsRef,
        getItemProps,
        sizeClass: [sizeClass['base'], sizeClass['option']],
      }}
    >
      <div
        id={id}
        aria-haspopup={'listbox'}
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        data-active={dataAttr(open || focus || searchInputFocus)}
        data-disabled={dataAttr(disabled)}
        aria-disabled={ariaAttr(disabled)}
        aria-required={ariaAttr(required)}
        className={cx(
          'relative inline-flex h-fit items-center rounded border border-gray-200 bg-white outline-none transition-colors',
          invalid && 'border-red-500',
          disabled
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : 'active:(border-blue-500 z-[1]) cursor-default',
          !invalid && !disabled && 'hover:(border-gray-300 z-[2])',
          fullWidth ? 'w-full' : '',
          sizeClass['base'],
          sizeClass['select'],
          className
        )}
        {...getReferenceProps({
          role: 'combobox',
          style: style,
          ref: referenceRefs,
          onFocus: () => {
            searchable && searchInputRef.current && searchInputRef.current.focus();
          },
          onPointerMove() {
            setControlledScrolling(false);
          },
          onKeyDown(event) {
            setControlledScrolling(true);

            if (activeIndex != null) {
              if (event.key == 'Enter') {
                event.preventDefault();
                handleSelected(elements[activeIndex].props.value);
              }
            }

            if (!searchValue && event.key == ' ') {
              event.preventDefault();
            }

            if (event.key == 'Tab') {
              setOpen(false);
            }

            if (event.key == 'Delete' || event.key == 'Backspace') {
              if (Array.isArray(controlledValue)) {
                const lastValue = controlledValue.at(-1);

                if (lastValue != undefined) {
                  handleSelected(lastValue, false);
                }
              } else {
                if (controlledValue != undefined) {
                  handleClear();
                }
              }
            }
          },
          onKeyUp(event) {
            setControlledScrolling(true);

            if (activeIndex != null) {
              if (!searchValue && event.key == ' ') {
                event.preventDefault();
                handleSelected(elements[activeIndex].props.value);
              }
            }
          },
        })}
      >
        <div className={'flex-1 select-none'}>
          {Array.isArray(controlledValue) ? renderMultipleValue(controlledValue) : renderSingleValue(controlledValue)}
        </div>
        <div className={'flex items-center gap-1'}>
          {showClearButton && (
            <CloseButton
              aria-hidden={true}
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
              className={'rounded-full p-0.5 text-gray-500 hover:bg-gray-100'}
            />
          )}
          <SelectChevron />
        </div>
        {Array.isArray(controlledValue) ? (
          controlledValue?.map((value) => <input key={value} type={'hidden'} ref={ref} value={value} {...rest} />)
        ) : (
          <input type={'hidden'} ref={ref} value={controlledValue || ''} {...rest} />
        )}
      </div>
      <Portal>
        <AnimatePresence>
          {open && (
            <Motion
              {...getMotionProps(motionPreset, motionProps)}
              className={cx(
                'scrollbar-thin absolute z-50 max-h-80 overflow-y-auto overscroll-contain rounded border border-gray-200 bg-white shadow outline-none dark:bg-gray-700',
                virtual ? 'px-1.5' : 'p-1.5'
              )}
              ref={refs.setFloating}
              style={{
                top: y || 0,
                left: x || 0,
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
                {virtual ? (
                  rowVirtual.getVirtualItems().map((row) =>
                    cloneElement(elements[row.index], {
                      id: `${floatingId}-${row.index}`,
                      style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: `${row.size}px`,
                        transform: `translateY(${row.start}px)`,
                      },
                    })
                  )
                ) : elements.length > 0 ? (
                  elements
                ) : (
                  <li className={'text-center'}>暂无数据</li>
                )}
              </ul>
            </Motion>
          )}
        </AnimatePresence>
      </Portal>
    </SelectProvider>
  );
});

Select.displayName = 'Select';
