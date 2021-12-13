import { __DEV__ } from '@agile-ui/utils';
import { createContext, useContext, useMemo } from 'react';
import { polymorphicComponent } from '../polymorphic/Polymorphic';
import { ButtonVariants } from './Button.css';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

const DEFAULT_TAG = 'div';

type ButtonGroupProps = ButtonGroupContextProps;

export const ButtonGroup = polymorphicComponent<typeof DEFAULT_TAG, ButtonGroupProps>((props, ref) => {
  const { as: Component = DEFAULT_TAG, children, size, level, variant, disabled, ...rest } = props;

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
