import { primitiveComponent } from '../utils/component';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuItemIndicatorProvider } from './DropdownMenuItemIndicator';
import { useDropdownMenuRadioGroup } from './DropdownMenuRadioGroup';
import { cx } from '@twind/core';

type DropdownMenuRadioItemProps = {
  value: string | number;
};

export const DropdownMenuRadioItem = primitiveComponent<typeof DropdownMenuItem, DropdownMenuRadioItemProps>(
  (props, ref) => {
    const { value, onClick, children, className, ...rest } = props;

    const group = useDropdownMenuRadioGroup();
    const checked = value == group.value;

    return (
      <DropdownMenuItemIndicatorProvider value={{ checked }}>
        <DropdownMenuItem
          role="menuitemradio"
          onClick={() => {
            group.onChange?.(value);
            onClick && onClick();
          }}
          aria-checked={checked}
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

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
