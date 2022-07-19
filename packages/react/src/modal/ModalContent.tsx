import { mergeRefs, useAnimation } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const {
    open,
    floating,
    context,
    getFloatingProps,
    animation = {},
    labelId,
    descriptionId,
    initialFocus,
    scrollBehavior,
  } = useModal();

  const { duration = 300, enter = 'opacity-100', exit = 'opacity-0', transition = 'transition-opacity' } = animation;

  const { stage, shouldMount } = useAnimation(open, duration);

  if (!shouldMount) {
    return null;
  }

  return (
    <div
      className={cx(
        'flex fixed w-screen left-0 top-0 z-40 justify-center',
        scrollBehavior == 'inside' ? 'h-screen items-center' : 'overflow-y-auto h-full items-start'
      )}
    >
      <FloatingFocusManager modal={true} initialFocus={initialFocus} context={context}>
        <div
          className={cx(
            'relative flex flex-col shadow rounded border border-gray-200 bg-white dark:bg-gray-700',
            scrollBehavior == 'inside' ? 'max-h-[calc(100%-9rem)] ' : 'my-10',
            `duration-[${duration}ms] ${transition}`,
            stage == 'enter' ? enter : exit,
            className
          )}
          {...getFloatingProps({
            ...rest,
            ref: mergeRefs(floating, ref),
            'aria-labelledby': labelId,
            'aria-describedby': descriptionId,
          })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </div>
  );
});

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}
