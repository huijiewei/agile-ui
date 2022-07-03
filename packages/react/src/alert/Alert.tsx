import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { createContext } from '../utils/context';
import type { Color } from '../utils/types';

export type AlertProps = {
  color: Color;
  variant: 'solid' | 'outline' | 'light';
};

const [AlertProvider, useAlertContext] = createContext<AlertProps>({
  name: 'AlertContext',
  strict: true,
  errorMessage: 'useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`',
});

export const Alert = primitiveComponent<'div', AlertProps>((props, ref) => {
  const { color, variant, className, children, ...rest } = props;

  return (
    <AlertProvider value={{ color, variant }}>
      <div ref={ref} className={cx('', className)} {...rest}>
        {children}
      </div>
    </AlertProvider>
  );
});

export const AlertTitle = primitiveComponent<'div'>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cx('', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  Alert.displayName = 'Alert';
}
