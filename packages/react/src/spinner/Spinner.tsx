import { polymorphicComponent } from '../utils/polymorphic';
import { twClsx } from '../utils/tailwind';
import { Size } from '../utils/types';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';

export type SpinnerProps = {
  size?: Size;
  label?: string;
};

const SpinnerStyles = {
  base: 'inline-block animate-spin rounded-full border-2',
  sizes: {
    xs: 'h-2 w-2',
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  },
};

export const Spinner = polymorphicComponent<'div', SpinnerProps>((props, ref) => {
  const { as: Component = 'div', label = '加载中…', className, size = 'md', ...rest } = props;
  return (
    <Component
      className={twClsx(
        SpinnerStyles.base,
        SpinnerStyles.sizes[size],
        'spinner-current spinner-empty-transparent',
        className
      )}
      ref={ref}
      {...rest}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Component>
  );
});
