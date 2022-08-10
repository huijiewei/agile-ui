import { Icon, IconProps } from '../Icon';

export const HeartBroken = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
      <path d="M12 6l-2 4 4 3-2 4v3" />
    </Icon>
  );
};
