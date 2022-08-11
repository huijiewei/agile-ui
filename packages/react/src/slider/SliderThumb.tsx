import { primitiveComponent, primitiveOmitComponent } from '../utils/component';
import { cx } from 'twind';
import { useSlider, useSliderThumb, useSliderValue, ValueType } from './SliderProvider';
import { Tooltip } from '../tooltip/Tooltip';
import { __DEV__, ariaAttr, clamp, runIfFn } from '@agile-ui/utils';
import type { ScaleColor } from '../utils/types';
import { KeyboardEvent, useCallback } from 'react';
import { useFocus, useHover, useMergedRefs } from '@agile-ui/react-hooks';

type SliderThumbButtonProps = {
  value: number;
  max: number;
  min: number;
  color: ScaleColor;
  vertical: boolean;
  index?: number;
};

const SliderThumbButton = primitiveComponent<'button', SliderThumbButtonProps>((props, ref) => {
  const { className, disabled, color, value, max, min, vertical, children, index, ...rest } = props;

  const [focusRef, focus] = useFocus();
  const [hoverRef, hover] = useHover();

  const refs = useMergedRefs(ref, hoverRef, focusRef);
  const { dragging, onThumbMouseDown } = useSliderThumb();

  return (
    <Tooltip opened={focus || hover || dragging} placement={vertical ? 'right' : 'top'} content={value}>
      <button
        disabled={disabled}
        tabIndex={0}
        aria-disabled={ariaAttr(disabled)}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        role={'slider'}
        onMouseDown={(e) => {
          if (e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
          }

          onThumbMouseDown(index);
        }}
        ref={refs}
        onClick={(e) => e.stopPropagation()}
        className={cx(
          'absolute select-none touch-none z-[2] outline-none rounded-full bg-white transition-transform',
          `border-${color}-500 text-${color}-500 disabled:border-gray-300`,
          `focus-visible:(ring ring-${color}-300 z-10)`,
          !disabled && 'hover:scale-110',
          vertical ? 'left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2 -translate-x-1/2',
          !children && ['border-3 aspect-square', vertical ? 'w-1/2' : 'h-1/2'],
          className
        )}
        {...rest}
      >
        {runIfFn(children, index)}
      </button>
    </Tooltip>
  );
});

export const SliderThumb = primitiveOmitComponent<'button', 'value' | 'color'>((props, ref) => {
  const { className, ...rest } = props;

  const { max, min, color, step, reverse, disabled, vertical } = useSlider();
  const { value, onChange, onChangeEnd } = useSliderValue();

  const handelKeyDown = useCallback(
    (e: KeyboardEvent, index?: number) => {
      if (e.code == 'ArrowDown' || e.key == 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();

        const next: ValueType = Array.isArray(value)
          ? index == 0
            ? [clamp(reverse ? value[0] - step : value[0] + step, [min, value[1]]), value[1]]
            : [value[0], clamp(reverse ? value[1] - step : value[1] + step, [value[0], max])]
          : clamp(reverse ? value - step : value + step, [min, max]);

        onChange(next);
        onChangeEnd(next);

        return;
      }

      if (e.code == 'ArrowUp' || e.key == 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();

        const next: ValueType = Array.isArray(value)
          ? index == 0
            ? [clamp(reverse ? value[0] + step : value[0] - step, [min, value[1]]), value[1]]
            : [value[0], clamp(reverse ? value[1] + step : value[1] - step, [value[0], max])]
          : clamp(reverse ? value + step : value - step, [min, max]);

        onChange(next);
        onChangeEnd(next);

        return;
      }

      if (e.code == 'Home') {
        e.preventDefault();
        e.stopPropagation();

        const next: ValueType = Array.isArray(value) ? (index == 0 ? [min, value[1]] : [value[0], value[0]]) : min;

        onChange(next);
        onChangeEnd(next);
      }

      if (e.code == 'End') {
        e.preventDefault();
        e.stopPropagation();

        const next: ValueType = Array.isArray(value) ? (index == 0 ? [value[1], value[1]] : [value[0], max]) : max;

        onChange(next);
        onChangeEnd(next);
      }
    },
    [value, reverse, step, min, max, onChange, onChangeEnd]
  );

  const styleAttr = vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left';

  if (Array.isArray(value)) {
    return (
      <>
        <SliderThumbButton
          ref={ref}
          className={className}
          disabled={disabled}
          value={value[0]}
          max={value[1]}
          index={0}
          min={min}
          vertical={vertical}
          style={{
            [styleAttr]: (value[0] / max) * 100 + '%',
          }}
          onKeyDown={(e) => {
            handelKeyDown(e, 0);
          }}
          color={color}
          {...rest}
        />
        <SliderThumbButton
          ref={ref}
          className={className}
          disabled={disabled}
          value={value[1]}
          max={max}
          min={value[0]}
          index={1}
          vertical={vertical}
          style={{
            [styleAttr]: (value[1] / max) * 100 + '%',
          }}
          onKeyDown={(e) => {
            handelKeyDown(e, 1);
          }}
          color={color}
          {...rest}
        />
      </>
    );
  } else {
    return (
      <SliderThumbButton
        ref={ref}
        className={className}
        disabled={disabled}
        value={value}
        max={max}
        min={min}
        vertical={vertical}
        style={{
          [styleAttr]: (value / max) * 100 + '%',
        }}
        onKeyDown={(e) => {
          handelKeyDown(e);
        }}
        color={color}
        {...rest}
      />
    );
  }
});

if (__DEV__) {
  SliderThumb.displayName = 'SliderThumb';
}