import { useAnimation } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/component';

export type AnimationBaseProps = {
  /**
   * 动画过渡
   * @default 'transition-opacity'
   */
  transition?: string;

  /**
   * 动画过渡
   * @default 300
   */
  duration?: number;

  /**
   * 进入效果
   * @default 'opacity-100'
   */
  enter?: string;

  /**
   * 离开效果
   * @default 'opacity-0'
   */
  exit?: string;
};

export type AnimationProps = AnimationBaseProps & {
  show: boolean;
};

export const Animation = polymorphicComponent<'div', AnimationProps>((props, ref) => {
  const {
    as: Component = 'div',
    show,
    className,
    enter = 'opacity-100',
    exit = 'opacity-0',
    duration = 300,
    transition = 'transition-opacity',
    children,
    ...rest
  } = props;
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
