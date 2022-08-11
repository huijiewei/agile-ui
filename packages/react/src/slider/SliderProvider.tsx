import { createContext } from '../utils/context';
import type { ScaleColor, Size } from '../utils/types';
import type { ReactNode } from 'react';

export type ValueType = number | [number, number];

export type SliderBaseProps = {
  /**
   * 最小值
   * @default 0
   */
  min?: number;

  /**
   * 最大值
   * @default 100
   */
  max?: number;

  /**
   * 计数器步长
   * @default 1
   */
  step?: number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否反向
   * @default false
   */
  reverse?: boolean;

  /**
   * 是否垂直方向
   * @default false
   */
  vertical?: boolean;

  /**
   * 刻度
   * @default false
   */
  ticks?: boolean | number[];

  /**
   * 标记
   */
  marks?: { value: number; label?: ReactNode }[];

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
};

type SliderContextValue = Required<Omit<SliderBaseProps, 'marks'>> & Pick<SliderBaseProps, 'marks'>;

const [SliderProvider, useSlider] = createContext<SliderContextValue>({
  strict: true,
  name: 'SliderContext',
});

export { SliderProvider, useSlider };

type SliderValueContextValue = {
  value: ValueType;
  onChange: (value: ValueType) => void;
  onChangeEnd: (value: ValueType) => void;
};

const [SliderValueProvider, useSliderValue] = createContext<SliderValueContextValue>({
  strict: true,
  name: 'SliderValueContext',
});

export { SliderValueProvider, useSliderValue };

type SliderThumbContextValue = {
  dragging: boolean;
  onThumbMouseDown: (index?: number) => void;
};

const [SliderThumbProvider, useSliderThumb] = createContext<SliderThumbContextValue>({
  strict: true,
  name: 'SliderThumbContext',
});

export { SliderThumbProvider, useSliderThumb };
