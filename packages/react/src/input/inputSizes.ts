export const inputSizes = (prefix?: boolean, suffix?: boolean) => {
  return {
    xs: `h-6 leading-6 text-sm ${prefix ? 'pl-1' : 'pl-2'} ${suffix ? 'pr-1' : 'pr-2'}`,
    sm: `h-7 leading-7 ${prefix ? 'pl-1' : 'pl-2'} ${suffix ? 'pr-1' : 'pr-2'}`,
    md: `h-8 leading-8 ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
    lg: `h-9 leading-9 ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
    xl: `h-10 leading-10 text-lg ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
  };
};
