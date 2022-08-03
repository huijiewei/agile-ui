import { useControllableProp, useMergedRefs, usePrevious } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, ariaAttr, dataAttr, isArray } from '@agile-ui/utils';
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
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';
import { SelectOptionIndexProvider, SelectProvider } from './SelectProvider';
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
};

const selectSizes = {
  xs: 'h-6 leading-6 pl-2 pr-1 text-sm',
  sm: 'h-7 leading-7 pl-2 pr-1',
  md: 'h-8 leading-8 pl-3 pr-1.5',
  lg: 'h-9 leading-9 pl-3 pr-1.5',
  xl: 'h-10 leading-10 pl-3 pr-1.5 text-lg',
};

export const Select = primitiveComponent<'select', SelectProps>((props, ref) => {
  const {
    size = 'md',
    placeholder = '选择器',
    children,
    onChange,
    disabled = false,
    readOnly = false,
    invalid = false,
    multiple = false,
    clearable = false,
    opened = false,
    className,
    fullWidth = false,
    value,
    defaultValue = multiple ? [] : null,
    ...rest
  } = props;

  const cacheData = useMemo(() => {
    let optionIndex = 0;

    const cacheData: {
      elements: ReactNode[];
      options: { value: StringOrNumber | undefined; label: ReactNode }[];
    } = {
      elements: [],
      options: [{ value: undefined, label: placeholder }],
    };

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type == SelectOptionGroup) {
          Children.forEach(child.props.children, (groupChild: ReactNode) => {
            if (isValidElement(groupChild) && groupChild.type == SelectOption) {
              optionIndex++;
              cacheData.elements.push(
                <SelectOptionIndexProvider value={optionIndex}>{groupChild}</SelectOptionIndexProvider>
              );
              cacheData.options[optionIndex] = {
                value: groupChild.props.value,
                label: groupChild.props.label ? groupChild.props.label : groupChild.props.children,
              };
            } else {
              cacheData.elements.push(groupChild);
            }
          });
        } else if (child.type == SelectOption) {
          optionIndex++;
          cacheData.elements.push(<SelectOptionIndexProvider value={optionIndex}>{child}</SelectOptionIndexProvider>);
          cacheData.options[optionIndex] = {
            value: child.props.value,
            label: child.props.label ? child.props.label : child.props.children,
          };
        } else {
          cacheData.elements.push(child);
        }
      } else {
        cacheData.elements.push(child);
      }
    });

    return cacheData;
  }, [children, placeholder]);

  const [valueState, setValueState] = useState(defaultValue);

  const [isControlled, controlledValue] = useControllableProp(value, valueState);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const listContentRef = useRef<string[]>(cacheData.options.map((option) => option.value?.toString() || ''));

  const [open, setOpen] = useState(opened);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(
      listContentRef.current.indexOf(
        controlledValue ? (isArray(controlledValue) ? '' : controlledValue?.toString()) : ''
      )
    );
  }, [controlledValue]);

  const [controlledScrolling, setControlledScrolling] = useState(false);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const { x, y, reference, floating, context, refs, middlewareData } = useFloating<HTMLElement>({
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ availableWidth, availableHeight, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
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

  const showClearButton = clearable && controlledValue;

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
      <div
        aria-haspopup={'listbox'}
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        data-active={dataAttr(open)}
        data-disabled={dataAttr(disabled)}
        aria-disabled={ariaAttr(disabled)}
        className={cx(
          'inline-flex items-center border border-gray-200 bg-white relative rounded transition-colors outline-none',
          disabled
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'cursor-default active:(border-blue-500 z-[1]) focus-visible:(border-blue-500) hover:(border-gray-300 z-[2])',
          fullWidth ? 'w-full' : '',
          selectSizes[size],
          className
        )}
        {...getReferenceProps({
          ...rest,
          role: 'combobox',
          ref: reference,
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
        <span className={'flex flex-1'}>
          {selectedIndex > 0 ? cacheData.options[selectedIndex].label : placeholder}
        </span>
        {showClearButton && (
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cx(
              'absolute text-gray-500 rounded-full p-0.5 bg-gray-50 hover:bg-gray-100',
              size == 'xs' || size == 'sm' ? '-right-1' : '-right-2'
            )}
          />
        )}
        <span className={'ml-1 text-gray-500'}>
          <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>
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
                className={cx(
                  'overflow-y-auto absolute z-10 shadow rounded border outline-none w-auto p-1.5 border-gray-200 bg-white dark:bg-gray-700',
                  '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])'
                )}
                {...getFloatingProps({
                  ref: floating,
                  style: {
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                {cacheData.elements}
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
