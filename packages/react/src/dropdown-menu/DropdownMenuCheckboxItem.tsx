import { primitiveComponent } from '../utils/component';
import { DropdownMenuItem } from './DropdownMenuItem';
import { CheckedState, DropdownMenuItemIndicatorProvider } from './DropdownMenuItemIndicator';
import { cx } from '@twind/core';

type DropdownMenuCheckboxItemProps = {
  checked?: CheckedState;

  onChange?: (checked: CheckedState) => void;
};

export const DropdownMenuCheckboxItem = primitiveComponent<typeof DropdownMenuItem, DropdownMenuCheckboxItemProps>(
  (props, ref) => {
    const { checked = false, className, onChange, onClick, children, ...rest } = props;

    return (
      <DropdownMenuItemIndicatorProvider value={{ checked }}>
        <DropdownMenuItem
          role="menuitemcheckbox"
          onClick={() => {
            onChange?.(checked == 'indeterminate' ? true : !checked);
            onClick && onClick();
          }}
          aria-checked={checked == 'indeterminate' ? 'mixed' : checked}
          className={cx('relative pl-6', className)}
          {...rest}
          ref={ref}
        >
          {children}
        </DropdownMenuItem>
      </DropdownMenuItemIndicatorProvider>
    );
  }
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';
