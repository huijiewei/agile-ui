import { useMergedRefs } from '@agile-ui/react-hooks';
import { ariaAttr, dataAttr } from '@agile-ui/utils';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import {
  useDropdownMenuContent,
  useDropdownMenuDispatch,
  useDropdownMenuItemIndex,
  useDropdownMenuReference,
} from './DropdownMenuProvider';

export const DropdownMenuItemTrigger = primitiveComponent<'button'>((props, ref) => {
  const { children, className, disabled, ...rest } = props;

  const { setReference, getReferenceProps, open } = useDropdownMenuReference();
  const { handleClose } = useDropdownMenuDispatch();

  const { getItemProps, listItemsRef, allowHover, setActiveIndex } = useDropdownMenuContent();
  const itemIndex = useDropdownMenuItemIndex();

  const refs = useMergedRefs(
    ref,
    (node: HTMLButtonElement) => {
      listItemsRef.current[itemIndex] = node;
    },
    setReference
  );

  return (
    <button
      ref={refs}
      role={'menuitem'}
      disabled={disabled}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      data-opened={dataAttr(open)}
      className={cx(
        'flex w-full cursor-default items-center justify-between rounded p-1.5 leading-none outline-none transition-colors',
        'opened:not-focus:bg-gray-50 dark:opened:not-focus:bg-gray-500 focus:bg-gray-100 disabled:text-gray-300 dark:focus:bg-gray-600',
        className
      )}
      {...getReferenceProps({
        ...rest,
        onKeyDown: (event) => {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            handleClose();
          }
        },
      })}
      {...getItemProps({
        onClick: (event) => {
          event.stopPropagation();
        },
        onPointerEnter: () => {
          if (allowHover) {
            setActiveIndex(itemIndex);
          }
        },
      })}
    >
      {children}
      <span className={cx('ml-3', disabled ? 'text-gray-300' : 'text-gray-500')}>
        <svg
          className={'h-4 w-4'}
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

DropdownMenuItemTrigger.displayName = 'DropdownMenuItemTrigger';
