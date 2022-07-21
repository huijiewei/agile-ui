import { useControllableProp } from '@agile-ui/react-hooks';
import { __DEV__, isInputEvent } from '@agile-ui/utils';
import type { StringOrNumber } from '@agile-ui/utils';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { createContext } from '../utils/context';
import type { ScaleColor, Size } from '../utils/types';

export type RadioBaseProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

type RadioGroupBaseProps = RadioBaseProps & {
  /**
   * 名称, 转发到每个 `radio` 元素
   */
  name?: string;

  /**
   * 值
   */
  value?: StringOrNumber;
};

type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement> | StringOrNumber) => void;
};

const [RadioGroupProvider, useRadioGroup] = createContext<RadioGroupContextValue>({
  name: 'RadioGroupContext',
  strict: true,
});

export { useRadioGroup };

type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: StringOrNumber;

  /**
   * 选中任何子项单选框或未选中时触发回调
   */
  onChange?: (value: StringOrNumber) => void;
};

export const RadioGroup = (props: PropsWithChildren<RadioGroupProps>) => {
  const { color, size, children, disabled, value, name, defaultValue = '', onChange } = props;

  const [state, setState] = useState<StringOrNumber>(defaultValue);

  const [isControlled, controlledValue] = useControllableProp(value, state);

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | StringOrNumber) => {
      const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      if (!isControlled) {
        setState(nextValue);
      }

      onChange?.(String(nextValue));
    },
    [isControlled, onChange]
  );

  const group = useMemo(
    () => ({
      name,
      size,
      color,
      onChange: handleChange,
      value: controlledValue,
      disabled,
    }),
    [name, size, color, handleChange, controlledValue, disabled]
  );

  return <RadioGroupProvider value={group}>{children}</RadioGroupProvider>;
};

if (__DEV__) {
  RadioGroup.displayName = 'RadioGroup';
}
