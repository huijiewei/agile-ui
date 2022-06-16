import { __DEV__ } from '@agile-ui/utils';
import type { StringOrNumber } from '@agile-ui/utils';
import { tx } from 'twind';
import { primitiveComponent } from '../utils/component';

export type CheckboxGroupProps = {
  /**
   * The value of the checkbox group
   */
  value?: StringOrNumber[];

  defaultValue?: StringOrNumber[];

  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: StringOrNumber[]): void;
};

export const CheckboxGroup = primitiveComponent<'div', CheckboxGroupProps>((props, ref) => {
  const { value, defaultValue, onChange, children, className, ...rest } = props;

  return (
    <div className={tx('', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
