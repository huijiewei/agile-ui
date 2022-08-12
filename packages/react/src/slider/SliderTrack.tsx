import { primitiveComponent } from '../utils/component';
import { __DEV__, clamp } from '@agile-ui/utils';
import { cx } from 'twind';
import { useSlider, useSliderValue } from './SliderProvider';
import { useCallback, useMemo } from 'react';
import { ticks as arrayTicks } from '@agile-ui/utils';

export const SliderTrack = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;

  const { color, step, ticks, marks, min, reverse, vertical, max, disabled } = useSlider();
  const { value } = useSliderValue();

  const tickMemo = useMemo(() => {
    if (Array.isArray(ticks)) {
      return ticks;
    }

    if (ticks) {
      const count = clamp((max - min) / step, [5, 20]);

      return arrayTicks(count, [min, max]).filter((t) => t != min && t != max);
    }

    return undefined;
  }, [max, min, step, ticks]);

  const inValueRange = useCallback(
    (position: number) => {
      return Array.isArray(value)
        ? position >= value[0] && position <= value[1]
        : reverse
        ? value == max
          ? position > value
          : position >= value
        : value == max
        ? position <= value
        : position < value;
    },
    [reverse, value, max]
  );

  const trackStyle = useMemo(
    () =>
      Array.isArray(value)
        ? {
            [vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']: (value[0] / max) * 100 + '%',
            [vertical ? 'height' : 'width']: ((value[1] - value[0]) / max) * 100 + '%',
          }
        : { [vertical ? 'height' : 'width']: reverse ? ((max - value) / max) * 100 + '%' : (value / max) * 100 + '%' },
    [max, reverse, value, vertical]
  );

  return (
    <>
      <div
        ref={ref}
        className={cx('bg-gray-100 relative rounded', vertical ? 'h-full w-1' : 'w-full h-1', className)}
        {...rest}
      >
        <div
          className={cx(
            'absolute rounded',
            vertical ? 'w-full' : 'h-full',
            disabled ? 'bg-gray-300' : `bg-${color}-500`
          )}
          style={trackStyle}
        />
        {tickMemo && (
          <div className={vertical ? 'h-full' : 'w-full'}>
            {tickMemo.map((tick) => {
              const translate = vertical ? 'y' : 'x';

              const tickTranslate =
                tick != min && tick != max
                  ? `-translate-${translate}-1/2`
                  : reverse
                  ? tick == min && `-translate-${translate}-full`
                  : tick == max && `-translate-${translate}-full`;

              return (
                <div
                  key={tick}
                  className={cx(
                    'absolute',
                    inValueRange(tick) ? `bg-${color}-500` : 'bg-gray-100',
                    vertical ? 'w-1.5 h-px -left-3/4' : 'h-1.5 w-px -top-3/4',
                    tickTranslate
                  )}
                  style={{
                    [vertical ? 'top' : 'left']: ((reverse ? max - tick : tick) / max) * 100 + '%',
                  }}
                />
              );
            })}
          </div>
        )}
        {marks && (
          <div className={vertical ? 'h-full' : 'w-full'}>
            {marks.map((mark) => {
              const translate = vertical ? 'y' : 'x';

              const markTranslate =
                mark.value != min && mark.value != max
                  ? `-translate-${translate}-1/2`
                  : reverse
                  ? mark.value == min && `-translate-${translate}-full`
                  : mark.value == max && `-translate-${translate}-full`;

              return (
                <div
                  key={mark.value}
                  className={cx('absolute z-[2] flex', vertical ? 'flex-col' : 'flex-row')}
                  style={{
                    [vertical ? 'top' : 'left']: ((reverse ? max - mark.value : mark.value) / max) * 100 + '%',
                  }}
                >
                  <div
                    className={cx(
                      'bg-white border-2 h-2 w-2 rounded-full',
                      vertical ? '-translate-x-1/4' : '-translate-y-1/4',
                      inValueRange(mark.value) ? `border-${color}-500` : 'border-gray-100',
                      markTranslate
                    )}
                  />
                  {mark.label && (
                    <div
                      className={cx(
                        'absolute text-gray-500 text-sm leading-none',
                        vertical ? 'left-3' : 'top-3',
                        markTranslate
                      )}
                    >
                      {mark.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  SliderTrack.displayName = 'SliderTrack';
}
