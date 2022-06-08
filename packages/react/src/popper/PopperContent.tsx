import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/component';
import { usePopper } from './PopperContext';

export const PopperContent = polymorphicComponent<'div'>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  const { strategy, floating, x, y, mounted } = usePopper();

  const floatingProps = {
    ref: useMergedRefs(floating, ref),
  };

  if (!mounted) {
    return null;
  }

  return (
    <Component
      className={tx('border-slate-200 bg-slate-50 items-center', `${strategy}`, `l-[${x}px] t-[${y}px]`, className)}
      {...floatingProps}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  PopperContent.displayName = 'PopperContent';
}
