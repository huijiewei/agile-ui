import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { PopperAnchor } from '../popper/PopperAnchor';
import { polymorphicComponent } from '../utils/component';
import { usePopover } from './PopoverContext';

export const PopoverTrigger = polymorphicComponent<'div'>((props, ref) => {
  const { as: Component = 'div', ...rest } = props;

  const { triggerRef, customAnchor } = usePopover();

  const trigger = <Component {...rest} ref={useMergedRefs(ref, triggerRef)} />;

  return customAnchor ? trigger : <PopperAnchor>{trigger}</PopperAnchor>;
});

if (__DEV__) {
  PopoverTrigger.displayName = 'PopoverTrigger';
}
