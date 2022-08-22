import { useControllableState } from '@agile-ui/react-hooks';
import { isInputEvent } from '@agile-ui/utils';
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
  value?: (string | number)[];
};

type CheckboxGroupContext = CheckboxGroupBaseProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
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
  defaultValue?: (string | number)[];

  /**
   * 任何子项复选框选中或未选中时触发回调
   */
  onChange?: (value: (string | number)[]) => void;
};

export const CheckboxGroup = (props: PropsWithChildren<CheckboxGroupProps>) => {
  const { value, defaultValue = [], onChange, children, size = 'md', color = 'blue', disabled = false } = props;

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
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
      value: state,
      onChange: handleChange,
    }),
    [size, color, disabled, state, handleChange]
  );

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>;
};

CheckboxGroup.displayName = 'CheckboxGroup';
