import { useAnimation, useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { useDropdownMenu } from './DropdownMenuProvider';

export const DropdownMenuContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { open, x, y, floating, context, getFloatingProps, animation = {}, labelId, descriptionId } = useDropdownMenu();

  const { duration = 300, enter = 'opacity-100', exit = 'opacity-0', transition = 'transition-opacity' } = animation;

  const refs = useMergedRefs(floating, ref);

  const { stage, shouldMount } = useAnimation(open, duration);

  return (
    <Portal>
      {shouldMount && (
        <FloatingFocusManager context={context}>
          <div
            className={cx('absolute z-30', `duration-[${duration}ms] ${transition}`, stage == 'enter' ? enter : exit)}
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
              className={cx(
                'relative p-1.5 min-w-[10em] rounded shadow border border-gray-200 bg-white dark:bg-gray-700',
                className
              )}
            >
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </Portal>
  );
});

if (__DEV__) {
  DropdownMenuContent.displayName = 'DropdownMenuContent';
}
