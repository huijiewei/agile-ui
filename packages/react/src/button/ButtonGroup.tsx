import { __DEV__ } from '@agile-ui/utils';
import { createContext, useContext, useMemo } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';
import { ButtonVariants } from './Button.css';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

type ButtonGroupProps = ButtonGroupContextProps;

export const ButtonGroup = polymorphicComponent<'div', ButtonGroupProps>((props, ref) => {
  const { as: Component = 'div', children, size, level, variant, disabled, ...rest } = props;

  const context = useMemo(() => ({ size, level, variant, disabled }), [size, level, variant, disabled]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <Component {...rest} ref={ref}>
        {children}
      </Component>
    </ButtonGroupContext.Provider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
