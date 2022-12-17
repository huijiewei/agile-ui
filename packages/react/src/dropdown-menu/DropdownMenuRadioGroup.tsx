import { createContext } from '../utils/context';
import type { PrimitiveComponentProps } from '../utils/component';
import { useCallbackRef } from '@agile-ui/react-hooks';
import { DropdownMenuGroup } from './DropdownMenuGroup';

type DropdownMenuRadioGroupProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const [DropdownMenuRadioGroupProvider, useDropdownMenuRadioGroup] = createContext<DropdownMenuRadioGroupProps>({
  strict: true,
  name: 'DropdownMenuRadioGroupContext',
});

export { useDropdownMenuRadioGroup };

export const DropdownMenuRadioGroup = (props: PrimitiveComponentProps<'div', DropdownMenuRadioGroupProps>) => {
  const { value, onChange, ...rest } = props;

  const handleChange = useCallbackRef(onChange);

  return (
    <DropdownMenuRadioGroupProvider
      value={{
        value,
        onChange: handleChange,
      }}
    >
      <DropdownMenuGroup {...rest}></DropdownMenuGroup>
    </DropdownMenuRadioGroupProvider>
  );
};

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';
