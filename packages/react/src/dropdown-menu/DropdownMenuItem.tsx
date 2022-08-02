import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useDropdownMenuContent, useDropdownMenuItemIndex } from './DropdownMenuProvider';

type DropdownMenuItemProps = {
  onClick: () => void;
};

export const DropdownMenuItem = primitiveComponent<'button', DropdownMenuItemProps>((props, ref) => {
  const { className, children, onClick, disabled = false, ...rest } = props;

  const { tree, getItemProps, listItemsRef, allowHover, setActiveIndex } = useDropdownMenuContent();
  const itemIndex = useDropdownMenuItemIndex();

  const refs = useMergedRefs(ref, (node: HTMLButtonElement) => {
    listItemsRef.current[itemIndex] = node;
  });

  return (
    <button
      ref={refs}
      role={'menuitem'}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      disabled={disabled}
      className={cx(
        'flex justify-between items-center w-full transition-colors outline-none cursor-default p-1.5 leading-none rounded',
        'focus:bg-gray-100 dark:focus:bg-gray-600 disabled:text-gray-300',
        className
      )}
      {...getItemProps({
        onClick: () => {
          tree?.events.emit('click');
          onClick && onClick();
        },
        onPointerEnter: () => {
          if (allowHover) {
            setActiveIndex(itemIndex);
          }
        },
      })}
      {...rest}
    >
      {children}
    </button>
  );
});

if (__DEV__) {
  DropdownMenuItem.displayName = 'DropdownMenuItem';
}
