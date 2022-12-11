import { primitiveComponent } from '../utils/component';
import { clamp } from '@agile-ui/utils';
import { cx } from '@twind/core';
import { useCallback, useMemo, useState, MouseEvent, TouchEvent, useRef } from 'react';
import { SliderBaseProps, SliderProvider, SliderThumbProvider, SliderValueProvider, ValueType } from './SliderProvider';
import { useControllableProp, useMove } from '@agile-ui/react-hooks';

export type SliderProps = SliderBaseProps & {
  /**
   * 可控值
   */
  value?: ValueType;

  /**
   * 非可控默认值
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
      value: controlledValue,
      onChange: (value: ValueType) => {
        if (!controlled) {
          setValueState(value);
        }

        onChange && onChange(value);
      },
      onChangeEnd: (value: ValueType) => {
        onChangeEnd && onChangeEnd(value);
      },
    }),
    [controlled, controlledValue, onChange, onChangeEnd]
  );

  const [thumbIndex, setThumbIndex] = useState<number | undefined>(undefined);

  const valueRef = useRef(controlledValue);

  const handleMoveChange = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (!disabled) {
        const dx = (vertical ? y : x) * (max - min);
        const next = (dx != 0 ? Math.round((reverse ? max - dx : dx) / step) * step : reverse ? max : 0) + min;

        const value: ValueType = Array.isArray(controlledValue)
          ? thumbIndex == 1
            ? [controlledValue[0], clamp(next, [controlledValue[0], max])]
            : [clamp(next, [min, controlledValue[1]]), controlledValue[1]]
          : clamp(next, [min, max]);

        if (!controlled) {
          setValueState(value);
        }

        valueRef.current = value;

        onChange && onChange(value);
      }
    },
    [disabled, vertical, reverse, max, min, step, controlledValue, thumbIndex, controlled, onChange]
  );

  const [moveRef, active] = useMove(handleMoveChange, { onScrubEnd: () => onChangeEnd?.(valueRef.current) });

  const thumbContext = useMemo(
    () => ({
      dragging: active,
      onThumbMouseDown: (index?: number) => setThumbIndex(index),
    }),
    [active]
  );

  const handleTrackMouseDownCapture = useCallback(
    (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (!Array.isArray(controlledValue)) {
        return;
      }

      const element = moveRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();

        const changePosition =
          event.type == 'mousedown'
            ? vertical
              ? (event as MouseEvent).nativeEvent.clientY
              : (event as MouseEvent).nativeEvent.clientX
            : vertical
            ? (event as TouchEvent).nativeEvent.touches[0].clientY
            : (event as TouchEvent).nativeEvent.touches[0].clientX;

        const rw = vertical ? rect.height : rect.width;

        const dx = (Math.min(Math.max(changePosition - (vertical ? rect.top : rect.left), 0), rw) / rw) * (max - min);

        const changeValue = (dx != 0 ? Math.round((reverse ? max - dx : dx) / step) * step : reverse ? max : 0) + min;

        const nearestHandle =
          Math.abs(controlledValue[0] - changeValue) > Math.abs(controlledValue[1] - changeValue) ? 1 : 0;

        setThumbIndex(nearestHandle);
      }
    },
    [controlledValue, max, min, moveRef, reverse, step, vertical]
  );

  return (
    <SliderProvider value={context}>
      <SliderValueProvider value={valueContext}>
        <SliderThumbProvider value={thumbContext}>
          <div
            ref={moveRef}
            tabIndex={-1}
            className={cx(
              'relative flex touch-none select-none items-center outline-none',
              vertical ? 'w-fit touch-pan-y px-3' : 'h-fit touch-pan-x py-3',
              marks && (vertical ? 'my-2 mr-3' : 'mx-2 mb-3'),
              className
            )}
            onTouchStartCapture={handleTrackMouseDownCapture}
            onTouchEndCapture={() => {
              setThumbIndex(undefined);
            }}
            onMouseDownCapture={handleTrackMouseDownCapture}
            onMouseUpCapture={() => {
              setThumbIndex(undefined);
            }}
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
        </SliderThumbProvider>
      </SliderValueProvider>
    </SliderProvider>
  );
});

Slider.displayName = 'Slider';
