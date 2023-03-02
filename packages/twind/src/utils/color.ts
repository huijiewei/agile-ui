export const autoColorKey = (key: string) => {
  return key == 'white'
    ? 'black'
    : key == 'black'
    ? 'white'
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      key.replace(/\d+$/, (shade) => ((8 - ~~(parseInt(shade, 10) / 100) || 0.5) * 100) as any);
};
