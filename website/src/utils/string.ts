export const camelCase = (str: string) => {
  return str
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');
};

export const slugify = (str: string) => {
  return str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
};
