import { mergeRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import { Presence } from '../animation/Presence';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { open, floating, context, getFloatingProps, animation, labelId, descriptionId, initialFocus, scrollBehavior } =
    useModal();

  return (
    <Presence>
      {open && (
        <div
          className={cx(
            'flex fixed w-screen left-0 top-0 z-40 justify-center',
            scrollBehavior == 'inside' ? 'h-screen items-center' : 'overflow-y-auto h-full items-start'
          )}
        >
          <FloatingFocusManager
            modal={true}
            order={['content', 'reference']}
            initialFocus={initialFocus}
            context={context}
          >
            <Animation
              {...animation}
              className={cx(
                'relative flex flex-col shadow rounded border border-gray-200 bg-white dark:bg-gray-700',
                scrollBehavior == 'inside' ? 'max-h-[calc(100%-9rem)] ' : 'my-10',
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
            </Animation>
          </FloatingFocusManager>
        </div>
      )}
    </Presence>
  );
});

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}
