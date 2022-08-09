export const inputSizes = (prefix?: boolean, suffix?: boolean) => {
  return {
    xs: `py-px text-sm ${prefix ? 'pl-1' : 'pl-2'} ${suffix ? 'pr-1' : 'pr-2'}`,
    sm: `py-0.5 ${prefix ? 'pl-1' : 'pl-2'} ${suffix ? 'pr-1' : 'pr-2'}`,
    md: `py-1 ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
    lg: `py-1.5 ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
    xl: `py-[7px] text-lg ${prefix ? 'pl-2' : 'pl-3'} ${suffix ? 'pr-2' : 'pr-3'}`,
  };
};
