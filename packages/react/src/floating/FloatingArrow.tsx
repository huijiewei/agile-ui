import { __DEV__ } from '@agile-ui/utils';
import type { Placement } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

type FloatingArrowSide = 'top' | 'left' | 'bottom' | 'right';
type FloatingArrowPosition = 'center' | 'start' | 'end';

const floatingArrowStyles = {
  top: 'border-b border-r',
  right: 'border-b border-l',
  bottom: 'border-t border-l',
  left: 'border-t border-r',
};

const floatingArrowOpposites = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

type FloatingArrowProps = {
  placement: Placement;
};

export const FloatingArrow = (props: PrimitiveComponentProps<'span', FloatingArrowProps>) => {
  const { placement, className, ...rest } = props;

  const [side, position = 'center'] = placement.split('-') as [FloatingArrowSide, FloatingArrowPosition];

  const horizontal = side == 'left' || side == 'right';

  return (
    <span
      className={cx(
        'absolute h-[8px] w-[8px] rotate-45',
        `-${floatingArrowOpposites[side]}-[5px]`,
        position == 'center'
          ? `${horizontal ? 'top' : 'left'}-[calc(50%-4px)]`
          : position == 'start'
          ? `${horizontal ? 'top' : 'left'}-[8px]`
          : `${horizontal ? 'bottom' : 'right'}-[8px]`,
        floatingArrowStyles[side],
        className
      )}
      {...rest}
    >
      &nbsp;
    </span>
  );
};

if (__DEV__) {
  FloatingArrow.displayName = 'FloatingArrow';
}
