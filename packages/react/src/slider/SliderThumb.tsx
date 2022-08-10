import { primitiveComponent, primitiveOmitComponent } from '../utils/component';
import { cx } from 'twind';
import { useSlider, useSliderValue, ValueType } from './SliderProvider';
import { Tooltip } from '../tooltip/Tooltip';
import { __DEV__, ariaAttr, runIfFn } from '@agile-ui/utils';
import type { ScaleColor } from '../utils/types';
import { KeyboardEvent, useCallback } from 'react';

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

  return (
    <Tooltip placement={'top'} content={value}>
      <button
        disabled={disabled}
        tabIndex={0}
        aria-disabled={ariaAttr(disabled)}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        role={'slider'}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={cx(
          'absolute select-none touch-none z-10 outline-none rounded-full bg-white transition-transform',
          `border-${color}-500 text-${color}-500 disabled:border-gray-300`,
          `focus-visible:(ring ring-${color}-300)`,
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
            ? [reverse ? value[0] - step : value[0] + step, value[1]]
            : [value[0], reverse ? value[1] - step : value[1] + step]
          : reverse
          ? value - step
          : value + step;

        onChange(next);
        onChangeEnd(next);

        return;
      }

      if (e.code == 'ArrowUp' || e.key == 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();

        const next: ValueType = Array.isArray(value)
          ? index == 0
            ? [reverse ? value[0] + step : value[0] - step, value[1]]
            : [value[0], reverse ? value[1] + step : value[1] - step]
          : reverse
          ? value + step
          : value - step;

        onChange(next);
        onChangeEnd(next);

        return;
      }
    },
    [value, reverse, step, onChange, onChangeEnd]
  );

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
          style={
            vertical
              ? {
                  top: (value[0] / max) * 100 + '%',
                }
              : {
                  left: (value[0] / max) * 100 + '%',
                }
          }
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
          style={
            vertical
              ? {
                  top: (value[1] / max) * 100 + '%',
                }
              : {
                  left: (value[1] / max) * 100 + '%',
                }
          }
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
        style={
          vertical
            ? {
                top: (value / max) * 100 + '%',
              }
            : {
                left: (value / max) * 100 + '%',
              }
        }
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
