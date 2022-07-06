import { __DEV__ } from '@agile-ui/utils';
import type { Placement } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';

type TooltipArrowSide = 'top' | 'left' | 'bottom' | 'right';
type TooltipArrowPosition = 'center' | 'start' | 'end';

const tooltipArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

type TooltipArrowProps = {
  placement: Placement;
  color?: ScaleColor;
};

const opposites = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

export const TooltipArrow = (props: PrimitiveComponentProps<'span', TooltipArrowProps>) => {
  const { placement, className, color, ...rest } = props;

  const [side, position = 'center'] = placement.split('-') as [TooltipArrowSide, TooltipArrowPosition];
  const horizontal = side == 'left' || side == 'right';

  return (
    <span
      className={cx(
        'absolute h-[8px] w-[8px] rotate-45',
        `-${opposites[side]}-[4px]`,
        position == 'center'
          ? `${horizontal ? 'top' : 'left'}-[calc(50%-4px)]`
          : position == 'start'
          ? `${horizontal ? 'top' : 'left'}-[8px]`
          : `${horizontal ? 'bottom' : 'right'}-[8px]`,
        tooltipArrowStyles[side],
        `border-${color}-800 bg-${color}-800 text-${color}-50 dark:(border-${color}-200 bg-${color}-200 text-${color}-900)`,
        className
      )}
      {...rest}
    >
      &nbsp;
    </span>
  );
};

if (__DEV__) {
  TooltipArrow.displayName = 'TooltipArrow';
}
