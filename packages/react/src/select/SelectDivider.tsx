import { __DEV__ } from '@agile-ui/utils';

export const SelectDivider = () => {
  return <div className={'h-px m-1 bg-gray-200'} role={'separator'} />;
};

if (__DEV__) {
  SelectDivider.displayName = 'SelectDivider';
}
