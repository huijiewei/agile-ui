import { __DEV__ } from '@agile-ui/utils';
import { useEffect } from 'react';
import { PopperAnchor } from '../popper/PopperAnchor';
import { polymorphicComponent } from '../utils/component';
import { usePopover } from './PopoverContext';

export const PopoverAnchor = polymorphicComponent<'div'>((props, ref) => {
  const { customAnchorAdd, customAnchorRemove } = usePopover();

  useEffect(() => {
    customAnchorAdd();
    return () => customAnchorRemove();
  }, [customAnchorAdd, customAnchorRemove]);

  return <PopperAnchor {...props} ref={ref} />;
});

if (__DEV__) {
  PopoverAnchor.displayName = 'PopoverAnchor';
}
