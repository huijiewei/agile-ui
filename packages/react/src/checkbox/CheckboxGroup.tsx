import { useCallbackRef, useControllableState } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__, isInputEvent } from '@agile-ui/utils';
import { ChangeEvent, useCallback, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { createContext } from '../utils/context';
import type { ScaleColor, Size } from '../utils/types';

export type CheckboxBaseProps = {
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

type CheckboxGroupBaseProps = CheckboxBaseProps & {
  /**
   * 值
   */
  value?: StringOrNumber[];
};

type CheckboxGroupContext = CheckboxGroupBaseProps & {
  /**
   * 选中任何子项复选框或未选中时触发回调
   */
  onChange?: (event: ChangeEvent<HTMLInputElement> | StringOrNumber) => void;
};

const [CheckboxGroupProvider, useCheckboxGroup] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
});

export { useCheckboxGroup };

export type CheckboxGroupProps = CheckboxGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: StringOrNumber[];

  /**
   * 当值发生变化时触发
   */
  onChange?: (value: StringOrNumber[]) => void;
};

export const CheckboxGroup = (props: PropsWithChildren<CheckboxGroupProps>) => {
  const { value, defaultValue = [], onChange, children, size = 'md', color = 'blue', disabled = false } = props;

  const onChangeRef = useCallbackRef(onChange);

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange: onChangeRef,
  });

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | StringOrNumber) => {
      if (!state) {
        return;
      }

      const isChecked = isInputEvent(eventOrValue) ? eventOrValue.target.checked : !state.includes(eventOrValue);

      const selectedValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      const nextValue = isChecked
        ? [...state, selectedValue]
        : state.filter((v) => String(v) !== String(selectedValue));

      setState(nextValue);
    },
    [state, setState]
  );

  const group = useMemo(
    () => ({
      size,
      color,
      disabled,
      value,
      onChange: handleChange,
    }),
    [size, handleChange, color, value, disabled]
  );

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>;
};

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
