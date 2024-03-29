import { isNumber } from '@agile-ui/utils';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import type { AvatarProps } from './Avatar';
import { avatarSizes } from './avatarSizes';

export type AvatarGroupProps = Pick<AvatarProps, 'radius' | 'size'> & {
  /**
   * 头像显示最大数量
   * @default 3
   */
  limit?: number;

  /**
   * 头像之间间隔
   * @default '-0.75em'
   */
  spacing?: string;
};

export const AvatarGroup = primitiveComponent<'div', AvatarGroupProps>((props, ref) => {
  const { limit = 3, className, radius = 'full', size = 'md', spacing = '-0.75em', children, ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];

  const economy = limit ? validChildren.slice(0, limit) : validChildren;
  const excess = limit != null && validChildren.length - limit;

  const clones = economy.reverse().map((child, index) => {
    return cloneElement(child, {
      size: size,
      radius: radius,
      className: cx(`border-2 border-white`, index == 0 ? 'mr-0' : `mr-[${spacing}]`),
    });
  });

  const rounded = radius ? (isNumber(radius) ? `-[${radius}px]` : `-${radius}`) : '';

  return (
    <div ref={ref} role="group" className={cx('flex flex-row-reverse items-center justify-end', className)} {...rest}>
      {excess > 0 && (
        <span
          className={cx(
            'relative inline-flex shrink-0 items-center justify-center bg-gray-100 text-center font-medium uppercase text-black',
            avatarSizes(size),
            `rounded${rounded}`,
            `ml-[${spacing}]`
          )}
        >{`+${excess}`}</span>
      )}
      {clones}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
