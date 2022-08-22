import { useControllableState } from '@agile-ui/react-hooks';
import { isInputEvent } from '@agile-ui/utils';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
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
  value?: string | number;
};

type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

const [RadioGroupProvider, useRadioGroup] = createContext<RadioGroupContextValue>({
  name: 'RadioGroupContext',
  strict: false,
});

export { useRadioGroup };

type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: string | number;

  /**
   * 选中任何子项单选框或未选中时触发回调
   */
  onChange?: (value: string | number) => void;
};

export const RadioGroup = (props: PropsWithChildren<RadioGroupProps>) => {
  const { color, size, children, disabled, value, name, defaultValue = '', onChange } = props;

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
      const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      setState(nextValue);
    },
    [setState]
  );

  const group = useMemo(
    () => ({
      name,
      size,
      color,
      onChange: handleChange,
      value: state,
      disabled,
    }),
    [name, size, color, handleChange, state, disabled]
  );

  return <RadioGroupProvider value={group}>{children}</RadioGroupProvider>;
};

RadioGroup.displayName = 'RadioGroup';
