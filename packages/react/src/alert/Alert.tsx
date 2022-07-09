import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent, PrimitiveComponentProps } from '../utils/component';
import { createContext } from '../utils/context';
import type { ScaleColor } from '../utils/types';

type AlertContextValue = {
  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 形式
   * @default 'light'
   */
  variant?: 'solid' | 'outline' | 'light';
};

const [AlertProvider, useAlertContext] = createContext<AlertContextValue>({
  name: 'AlertContext',
  strict: true,
  errorMessage: 'useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`',
});

export type AlertProps = AlertContextValue;

const alertVariants = (color: string) => {
  return {
    solid: `text-white border-transparent bg-${color}-500`,
    outline: `border-${color}-500 text-${color}-500 bg-white`,
    light: `border-transparent bg-${color}-100 text-${color}-500`,
  };
};

export const Alert = primitiveComponent<'div', AlertProps>((props, ref) => {
  const { color = 'blue', variant = 'light', className, children, ...rest } = props;

  return (
    <AlertProvider value={{ color, variant }}>
      <div
        role="alert"
        ref={ref}
        className={cx(
          'relative flex rounded p-3 border overflow-hidden items-center gap-2',
          alertVariants(color)[variant],
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </AlertProvider>
  );
});

if (__DEV__) {
  Alert.displayName = 'Alert';
}

export const AlertTitle = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;

  return <div className={cx('font-medium', className)} ref={ref} {...rest} />;
});

if (__DEV__) {
  AlertTitle.displayName = 'AlertTitle';
}

export const AlertDescription = primitiveComponent<'div'>((props, ref) => {
  const { variant } = useAlertContext();
  const { className, ...rest } = props;

  return <div className={cx(variant != 'solid' && 'text-black', className)} ref={ref} {...rest} />;
});

if (__DEV__) {
  AlertDescription.displayName = 'AlertDescription';
}

export const AlertIcon = (props: PrimitiveComponentProps<'span'>) => {
  const { className, ...rest } = props;

  return <span {...rest} className={cx(`shrink-0`, className)} />;
};
