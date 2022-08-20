import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export const CloseButton = primitiveComponent<'button'>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <button
      ref={ref}
      className={cx(
        'flex items-center justify-center shrink-0 outline-none appearance-none transition-colors focus-visible:ring',
        className
      )}
      {...rest}
    >
      {children || (
        <svg
          width={'1em'}
          height={'1em'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </button>
  );
});

CloseButton.displayName = 'CloseButton';
