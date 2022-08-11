import { primitiveComponent } from '../utils/component';
import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { useSlider, useSliderValue } from './SliderProvider';
import { useMemo } from 'react';

export const SliderTrack = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;

  const { color, step, ticks, marks, min, reverse, vertical, max, disabled } = useSlider();
  const { value, onChange, onChangeEnd } = useSliderValue();

  const tickMemo = useMemo(() => {
    if (Array.isArray(ticks)) {
      return ticks;
    }

    if (ticks) {
      return [];
    }

    return undefined;
  }, [ticks]);

  const trackStyle = Array.isArray(value)
    ? {
        [vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']: (value[0] / max) * 100 + '%',
        [vertical ? 'height' : 'width']: ((value[1] - value[0]) / max) * 100 + '%',
      }
    : { [vertical ? 'height' : 'width']: (value / max) * 100 + '%' };

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
        {marks && (
          <div className={cx('absolute', vertical ? 'h-full' : 'w-full')}>
            {marks.map((mark) => (
              <div
                key={mark.value}
                className={cx('absolute z-[1] flex', vertical ? 'flex-col' : 'flex-row')}
                style={{
                  [vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']:
                    (mark.value / max) * 100 + '%',
                }}
              >
                <div
                  className={cx(
                    'bg-white border-2 h-2 w-2 rounded-full',
                    vertical ? '-translate-x-1/4' : '-translate-y-1/4',
                    (Array.isArray(value) ? mark.value > value[0] && mark.value <= value[1] : mark.value < value)
                      ? `border-${color}-500`
                      : 'border-gray-100',
                    mark.value == min
                      ? ''
                      : mark.value == max
                      ? vertical
                        ? '-translate-y-full'
                        : '-translate-x-full'
                      : vertical
                      ? '-translate-y-1/2'
                      : '-translate-x-1/2'
                  )}
                />
                {mark.label && (
                  <div
                    className={cx(
                      'absolute text-gray-500 text-sm leading-none',
                      vertical ? 'left-3' : 'top-3',
                      mark.value == min
                        ? ''
                        : mark.value == max
                        ? vertical
                          ? '-translate-y-full'
                          : '-translate-x-full'
                        : vertical
                        ? '-translate-y-1/2'
                        : '-translate-x-1/2'
                    )}
                  >
                    {mark.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  SliderTrack.displayName = 'SliderTrack';
}
