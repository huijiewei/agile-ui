import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import { Presence } from '../animation/Presence';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { usePopoverAria, usePopoverFloating } from './PopoverProvider';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { open, x, y, floating, context, getFloatingProps, modal, initialFocus, animation } = usePopoverFloating();

  const { labelId, descriptionId } = usePopoverAria();

  const refs = useMergedRefs(floating, ref);

  return (
    <Portal>
      <Presence>
        {open && (
          <FloatingFocusManager modal={modal} initialFocus={initialFocus} context={context}>
            <Animation
              {...animation}
              className={'absolute z-10 outline-none'}
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
              <div
                className={cx('relative shadow rounded border border-gray-200 bg-white dark:bg-gray-700', className)}
              >
                {children}
              </div>
            </Animation>
          </FloatingFocusManager>
        )}
      </Presence>
    </Portal>
  );
});

if (__DEV__) {
  PopoverContent.displayName = 'PopoverContent';
}
