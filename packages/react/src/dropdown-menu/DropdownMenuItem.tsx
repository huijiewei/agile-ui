import { __DEV__, ariaAttr, dataAttr } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

type DropdownMenuItemProps = {
  disabled?: boolean;
};

export const DropdownMenuItem = primitiveComponent<'div', DropdownMenuItemProps>((props, ref) => {
  const { className, children, disabled = false, ...rest } = props;
  return (
    <div
      ref={ref}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      className={cx(
        'select-none relative flex items-center p-1.5 leading-none rounded',
        disabled ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100 dark:hover:bg-gray-600',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

if (__DEV__) {
  DropdownMenuItem.displayName = 'DropdownMenuItem';
}
