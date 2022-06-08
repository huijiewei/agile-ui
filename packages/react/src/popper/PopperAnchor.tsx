import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { useRef } from 'react';
import { polymorphicComponent } from '../utils/component';
import { usePopper } from './PopperContext';

export const PopperAnchor = polymorphicComponent<'div'>((props, ref) => {
  const { as: Component = 'div', ...rest } = props;
  const { anchorRef } = usePopper();
  const _ref = useRef<HTMLElement>(null);

  return <Component {...rest} ref={useMergedRefs(ref, _ref, anchorRef)} />;
});

if (__DEV__) {
  PopperAnchor.displayName = 'PopperAnchor';
}
