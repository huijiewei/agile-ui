import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ButtonVariants } from './Button.css';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

type PrimitiveButtonGroupProps = ComponentPropsWithoutRef<typeof Primitive.div>;

type ButtonGroupProps = PrimitiveButtonGroupProps &
  ButtonGroupContextProps & {
    children: ReactNode;
  };

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

export const ButtonGroup = (props: ButtonGroupProps) => {
  const { children, size, level, variant, disabled, ...rest } = props;

  const context = useMemo(() => ({ size, level, variant, disabled }), [size, level, variant, disabled]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <Primitive.div {...rest}>{children}</Primitive.div>
    </ButtonGroupContext.Provider>
  );
};
