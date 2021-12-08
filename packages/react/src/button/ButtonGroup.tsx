import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ButtonVariants } from './Button.css';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>({});

type PrimitiveButtonGroupProps = ComponentPropsWithoutRef<typeof Primitive.div>;

type ButtonGroupProps = PrimitiveButtonGroupProps &
  ButtonGroupContextProps & {
    children: ReactNode;
  };

export const useButtonGroup = (): ButtonGroupContextProps => {
  const context = useContext(ButtonGroupContext);
  if (context === undefined) {
    throw new Error('useButtonGroup must be used within a ButtonGroup');
  }
  return context;
};

export const ButtonGroup = (props: ButtonGroupProps) => {
  const { children, size, level, variant, ...rest } = props;

  const context = useMemo(() => ({ size, level, variant }), [size, level, variant]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <Primitive.div {...rest}>{children}</Primitive.div>
    </ButtonGroupContext.Provider>
  );
};
