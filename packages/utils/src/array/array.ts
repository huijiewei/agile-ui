export const ticks = (count: number, [begin, end]: [number, number]): number[] => {
  const e10 = Math.sqrt(50);
  const e5 = Math.sqrt(10);
  const e2 = Math.sqrt(2);

  let n;
  let ticks;

  let start = begin;
  let stop = end;

  if (start === stop && count > 0) {
    return [start];
  }

  const increment = (stop - start) / Math.max(0, count);
  const power = Math.floor(Math.log(increment) / Math.LN10);
  const error = increment / 10 ** power;

  let step =
    power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * 10 ** power
      : -(10 ** -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);

  if (step === 0 || !Number.isFinite(step)) {
    return [];
  }

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));

    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) * step;
    }
  } else {
    step = -step;
    start = Math.ceil(start * step);
    stop = Math.floor(stop * step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));

    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) / step;
    }
  }

  return ticks;
};
