import { createContext, forwardRef, ReactNode, useContext, useMemo } from 'react';
import { ButtonVariants } from './Button.css';
import { PolymorphicComponent, Primitive } from '../primitive/Primitive';
import { __DEV__ } from '@agile-ui/utils';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

type ButtonGroupOwnProps = ButtonGroupContextProps & {
  children: ReactNode;
};

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

const DEFAULT_TAG = 'div';

export const ButtonGroup: PolymorphicComponent<ButtonGroupOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const { as = DEFAULT_TAG, children, size, level, variant, disabled, ...restProps } = props;

  const context = useMemo(() => ({ size, level, variant, disabled }), [size, level, variant, disabled]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <Primitive ref={ref} as={as} {...restProps}>
        {children}
      </Primitive>
    </ButtonGroupContext.Provider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
