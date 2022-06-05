import { useAnimation } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/polymorphic';

export type TransitionProps = {
  show: boolean;
  enter?: string;
  exit?: string;
  duration?: number;
  transition?: string;
};

export const Animation = polymorphicComponent<'div', TransitionProps>((props, ref) => {
  const { as: Component = 'div', show, className, enter, exit, duration, transition, children, ...rest } = props;
  const { stage, shouldMount } = useAnimation(show, duration as number);

  if (!shouldMount) {
    return null;
  }

  return (
    <Component
      className={tx(className, `duration-[${duration}ms] ${transition}`, stage == 'enter' ? enter : exit)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  Animation.displayName = 'Animation';
}
