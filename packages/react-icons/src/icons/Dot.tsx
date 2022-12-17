import { Icon, IconProps } from '../Icon';

export const Dot = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path fill="currentColor" d="M12 15a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z" />
    </Icon>
  );
};
