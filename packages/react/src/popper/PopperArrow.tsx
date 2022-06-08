import { useIsomorphicLayoutEffect, useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/component';
import { usePopper } from './PopperContext';

export type PopperArrowProps = {
  size?: number;
};

const popperArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

export const PopperArrow = polymorphicComponent<'span', PopperArrowProps>((props, ref) => {
  const { as: Component = 'span', className, size = 8, ...rest } = props;

  const { placement, arrowRef, arrowStyle, arrowSize } = usePopper();

  const refs = useMergedRefs(arrowRef, ref);

  useIsomorphicLayoutEffect(() => {
    arrowSize?.(size);
  }, [size, arrowSize]);

  return (
    <Component
      {...rest}
      ref={refs}
      className={tx(
        'absolute pointer-events-none z-10 rotate-45 border-slate-200 bg-slate-50',
        popperArrowStyles[placement ? (placement.split('-')[0] as 'top' | 'left' | 'right' | 'bottom') : 'top'],
        `h-[${size}px] w-[${size}px]`,
        arrowStyle && `left-[${arrowStyle.x}px] top-[${arrowStyle.y}px]`,
        className
      )}
    />
  );
});

if (__DEV__) {
  PopperArrow.displayName = 'PopperArrow';
}
