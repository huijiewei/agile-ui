import { primitiveComponent } from '../utils/component';
import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { useMemo, useState } from 'react';
import { SliderBaseProps, SliderProvider, SliderValueProvider, ValueType } from './SliderProvider';
import { useControllableProp } from '@agile-ui/react-hooks';

export type SliderProps = SliderBaseProps & {
  /**
   * 当前值
   */
  value?: ValueType;

  /**
   * 默认值
   */
  defaultValue?: ValueType;

  /**
   * 拖动时触发值改变
   */
  onChange?: (value: ValueType) => void;

  /**
   * 拖动后触发值改变
   */
  onChangeEnd?: (value: ValueType) => void;
};

export const Slider = primitiveComponent<'input', SliderProps>((props, ref) => {
  const {
    className,
    children,
    color = 'blue',
    size = 'md',
    value,
    defaultValue = 0,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    reverse = false,
    vertical = false,
    disabled = false,
    ticks = false,
    marks,
    ...rest
  } = props;

  const [valueState, setValueState] = useState(defaultValue);
  const [controlled, controlledValue] = useControllableProp(value, valueState);

  const context = useMemo(
    () => ({
      reverse,
      vertical,
      disabled,
      color,
      size,
      step,
      min,
      max,
      ticks,
      marks,
    }),
    [reverse, vertical, disabled, color, size, step, min, max, ticks, marks]
  );

  const valueContext = useMemo(
    () => ({
      value: valueState,
      onChange: (value: ValueType) => {
        if (!controlled) {
          setValueState(value);
        }

        onChange && onChange(value);
      },
      onChangeEnd: (value: ValueType) => {
        if (!controlled) {
          setValueState(value);
        }

        onChangeEnd && onChangeEnd(value);
      },
    }),
    [controlled, onChange, onChangeEnd, valueState]
  );

  return (
    <SliderProvider value={context}>
      <SliderValueProvider value={valueContext}>
        <div
          className={cx(
            'relative select-none outline-0 touch-none items-center flex',
            vertical ? 'px-3' : 'py-3',
            marks && (vertical ? 'mr-3' : 'mb-3'),
            className
          )}
        >
          {children}
          {Array.isArray(controlledValue) ? (
            <>
              <input readOnly value={controlledValue[0]} className={'sr-only'} ref={ref} {...rest} />
              <input readOnly value={controlledValue[1]} className={'sr-only'} ref={ref} {...rest} />
            </>
          ) : (
            <input readOnly value={controlledValue} className={'sr-only'} ref={ref} {...rest} />
          )}
        </div>
      </SliderValueProvider>
    </SliderProvider>
  );
});

if (__DEV__) {
  Slider.displayName = 'Slider';
}
