import { createContext, ElementType, forwardRef, ReactElement, useContext, useMemo } from 'react';
import { ButtonVariants } from './Button.css';
import { __DEV__ } from '@agile-ui/utils';
import { PolymorphicComponentProps } from '@agile-ui/react';

type ButtonGroupContextProps = ButtonVariants;

const ButtonGroupContext = createContext<ButtonGroupContextProps>(undefined);

export const useButtonGroup = (): ButtonGroupContextProps => {
  return useContext(ButtonGroupContext);
};

const DEFAULT_TAG = 'div';

type Props = ButtonGroupContextProps;

export type ButtonGroupProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

type ButtonGroupComponent = <C extends ElementType = typeof DEFAULT_TAG>(
  props: ButtonGroupProps<C>
) => ReactElement | null;

export const ButtonGroup: ButtonGroupComponent & { displayName?: string } = forwardRef((props, ref) => {
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
