import { __DEV__ } from '@agile-ui/utils';
import { PopperArrow } from '../popper/PopperArrow';
import { polymorphicComponent } from '../utils/component';

export const TooltipArrow = polymorphicComponent<'span'>((props, ref) => {
  return <PopperArrow {...props} ref={ref} />;
});

if (__DEV__) {
  TooltipArrow.displayName = 'TooltipArrow';
}
