import { tx } from 'twind';
import { polymorphicComponent } from '../utils/polymorphic';
import { Size } from '../utils/types';

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

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;
};

export const Input = polymorphicComponent<'input', InputProps>((props, ref) => {
  const {
    as: Component = 'input',
    size = 'md',
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    ...rest
  } = props;
  return (
    <Component className={tx('px-2 py-1', className)} disabled={disabled} readOnly={readOnly} {...rest} ref={ref} />
  );
});
