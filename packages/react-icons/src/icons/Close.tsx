import { type IconProps, Icon } from '../Icon';

export const Close = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </Icon>
  );
};
