import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import {
  useDropdownMenuContent,
  useDropdownMenuDispatch,
  useDropdownMenuItemIndex,
  useDropdownMenuReference,
} from './DropdownMenuProvider';

export const DropdownMenuItemTrigger = primitiveComponent<'button'>((props, ref) => {
  const { children, className, disabled, ...rest } = props;

  const { reference, getReferenceProps, open } = useDropdownMenuReference();
  const { handleClose } = useDropdownMenuDispatch();

  const { getItemProps, listItemsRef, allowHover, setActiveIndex } = useDropdownMenuContent();
  const itemIndex = useDropdownMenuItemIndex();

  const refs = useMergedRefs(
    (node: HTMLButtonElement) => {
      listItemsRef.current[itemIndex] = node;
    },
    reference,
    ref
  );

  return (
    <button
      ref={refs}
      role={'menuitem'}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      disabled={disabled}
      data-opened={dataAttr(open)}
      className={cx(
        'relative w-full cursor-default outline-none flex items-center p-1.5 leading-none rounded',
        'disabled:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-600 opened:not-focus:bg-gray-50 dark:opened:not-focus:bg-gray-500',
        className
      )}
      {...getReferenceProps({
        ...rest,
        onKeyDown: (e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            handleClose();
          }
        },
      })}
      {...getItemProps({
        onClick: (e) => {
          e.stopPropagation();
          (e.currentTarget as HTMLButtonElement).focus();
        },
        onPointerEnter: () => {
          if (allowHover) {
            setActiveIndex(itemIndex);
          }
        },
      })}
    >
      {children}
      <span className={cx('ml-auto pl-5', disabled ? 'text-gray-300' : 'text-gray-500')}>
        <svg
          className={'w-4 h-4'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
});

if (__DEV__) {
  DropdownMenuItemTrigger.displayName = 'DropdownMenuItemTrigger';
}
