export const randomColor = (str: string) => {
  let hash = 0;

  if (str.length === 0) {
    return hash.toString();
  }

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';

  for (let j = 0; j < 3; j += 1) {
    const value = (hash >> (j * 8)) & 255;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const isDarkColor = (hex: string) => {
  const rgb = hexToRGB(hex);

  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 < 128;
};

export const hexToRGB = (hex: string) => {
  const rgb = { r: 0, g: 0, b: 0 };

  if (hex.length == 4) {
    rgb.r = parseInt(hex[1] + hex[1], 16);
    rgb.g = parseInt(hex[2] + hex[2], 16);
    rgb.b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length == 7) {
    rgb.r = parseInt(hex[1] + hex[2], 16);
    rgb.g = parseInt(hex[3] + hex[4], 16);
    rgb.b = parseInt(hex[5] + hex[6], 16);
  }

  return rgb;
};
