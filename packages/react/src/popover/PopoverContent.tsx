import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { usePopover } from './PopoverProvider';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { open, x, y, context, floating, getFloatingProps, animation, labelId, descriptionId } = usePopover();

  const refs = useMergedRefs(floating, ref);

  return (
    <Portal>
      {open && (
        <FloatingFocusManager context={context}>
          <Animation
            className={cx('absolute rounded border border-gray-200 bg-white px-3 py-2 z-30', className)}
            show={true}
            {...animation}
            {...getFloatingProps({
              ...rest,
              ref: refs,
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId,
              style: {
                top: y ? `${y}px` : '',
                left: x ? `${x}px` : '',
              },
            })}
          >
            {children}
          </Animation>
        </FloatingFocusManager>
      )}
    </Portal>
  );
});

if (__DEV__) {
  PopoverContent.displayName = 'PopoverContent';
}
