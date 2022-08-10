import { primitiveComponent } from '../utils/component';
import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { useSlider, useSliderValue } from './SliderProvider';
import { useCallback, useMemo, KeyboardEvent } from 'react';

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
    ? vertical
      ? { top: (value[0] / max) * 100 + '%', height: ((value[1] - value[0]) / max) * 100 + '%' }
      : { left: (value[0] / max) * 100 + '%', width: ((value[1] - value[0]) / max) * 100 + '%' }
    : vertical
    ? { height: (value / max) * 100 + '%' }
    : { width: (value / max) * 100 + '%' };

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
      </div>
    </>
  );
});

if (__DEV__) {
  SliderTrack.displayName = 'SliderTrack';
}
