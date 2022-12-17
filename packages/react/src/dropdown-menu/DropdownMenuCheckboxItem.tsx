import { primitiveComponent } from '../utils/component';
import { DropdownMenuItem } from './DropdownMenuItem';
import { CheckedState, DropdownMenuItemIndicatorProvider } from './DropdownMenuItemIndicator';

type DropdownMenuCheckboxItemProps = {
  checked?: CheckedState;

  onChange?: (checked: CheckedState) => void;
};

export const DropdownMenuCheckboxItem = primitiveComponent<typeof DropdownMenuItem, DropdownMenuCheckboxItemProps>(
  (props, ref) => {
    const { checked = false, onChange, onClick, children, ...rest } = props;

    return (
      <DropdownMenuItemIndicatorProvider value={{ checked }}>
        <DropdownMenuItem
          role="menuitemcheckbox"
          onClick={() => {
            onChange?.(checked == 'indeterminate' ? true : !checked);
            onClick && onClick();
          }}
          aria-checked={checked == 'indeterminate' ? 'mixed' : checked}
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
