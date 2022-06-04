import { tx } from 'twind';
import { polymorphicComponent } from '../utils/polymorphic';
import type { Size } from '../utils/types';

export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export type InputProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;
  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;
};

const inputSizes = {
  xs: 'h-6 leading-6 px-2 text-sm',
  sm: 'h-7 leading-7 px-2',
  md: 'h-8 leading-8 px-3',
  lg: 'h-9 leading-9 px-3',
  xl: 'h-10 leading-10 px-3 text-lg',
};

export const Input = polymorphicComponent<'input', InputProps>((props, ref) => {
  const {
    as: Component = 'input',
    size = 'md',
    disabled = false,
    required = false,
    readOnly = false,
    className,
    ...rest
  } = props;
  return (
    <Component
      className={tx(
        'border border-slate-300 rounded outline-none appearance-none resize-none w-full text-left',
        'bg-white dark:bg-slate-900',
        'focus:border-blue-500',
        'transition-[border-color]',
        inputSizes[size],
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      readOnly={readOnly}
      {...rest}
      ref={ref}
    />
  );
});
