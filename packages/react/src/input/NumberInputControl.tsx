import type { PrimitiveComponentProps } from '../utils/component';
import { cx } from 'twind';
import { __DEV__ } from '@agile-ui/utils';

const IncrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const DecrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
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
        'w-full select-none appearance-none transition-colors disabled:(opacity-50 cursor-not-allowed bg-gray-50) flex flex-1 justify-center items-center bg-gray-50 hover:bg-gray-200',
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

if (__DEV__) {
  NumberInputControl.displayName = 'NumberInputControl';
}
