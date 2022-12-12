import type { PrimitiveComponentProps } from '../utils/component';
import { cx } from '@twind/core';

const IncrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
    </svg>
  );
};

const DecrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  );
};

export const NumberInputControl = (
  props: PrimitiveComponentProps<'button', { stepper: 'increment' | 'decrement' }>
) => {
  const { className, disabled, stepper, ...rest } = props;

  return (
    <button
      tabIndex={-1}
      disabled={disabled}
      className={cx(
        'disabled:(opacity-50 bg-gray-50 cursor-not-allowed) flex w-full flex-1 select-none appearance-none items-center justify-center bg-gray-50 transition-colors hover:bg-gray-200',
        stepper == 'increment' && 'rounded-tr',
        stepper == 'decrement' && 'rounded-br',
        className
      )}
      {...rest}
    >
      {stepper == 'increment' && <IncrementIcon />}
      {stepper == 'decrement' && <DecrementIcon />}
    </button>
  );
};
