import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { scrollBehavior } = useModal();

  return (
    <div
      ref={ref}
      className={cx(
        'px-3 py-2 flex-1',
        scrollBehavior == 'inside' && 'overflow-y-auto overscroll-contain scrollbar-thin',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}
