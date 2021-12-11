import { createContext, useContext, useMemo } from 'react';
import { ButtonVariants } from './Button.css';
import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../polymorphic/Polymorphic';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

type ButtonGroupOwnProps = ButtonGroupContextProps;

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

const DEFAULT_TAG = 'div';

export const ButtonGroup = polymorphicComponent<typeof DEFAULT_TAG, ButtonGroupOwnProps>((props, ref) => {
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
