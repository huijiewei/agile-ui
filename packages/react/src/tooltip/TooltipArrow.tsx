import { __DEV__ } from '@agile-ui/utils';
import type { Placement } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { FloatingArrow } from '../floating/FloatingArrow';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';

type TooltipArrowProps = {
  placement: Placement;
  color?: ScaleColor;
};

export const TooltipArrow = (props: PrimitiveComponentProps<'span', TooltipArrowProps>) => {
  const { placement, className, color, ...rest } = props;

  return (
    <FloatingArrow
      placement={placement}
      className={cx(`border-${color}-600 bg-${color}-600 text-${color}-50`, className)}
      {...rest}
    />
  );
};

if (__DEV__) {
  TooltipArrow.displayName = 'TooltipArrow';
}
