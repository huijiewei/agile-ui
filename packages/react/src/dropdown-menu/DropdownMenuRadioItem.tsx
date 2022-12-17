import { primitiveComponent } from '../utils/component';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuItemIndicatorProvider } from './DropdownMenuItemIndicator';
import { useDropdownMenuRadioGroup } from './DropdownMenuRadioGroup';

type DropdownMenuRadioItemProps = {
  value: string | number;
};

export const DropdownMenuRadioItem = primitiveComponent<typeof DropdownMenuItem, DropdownMenuRadioItemProps>(
  (props, ref) => {
    const { value, onClick, children, ...rest } = props;

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
