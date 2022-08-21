import { isNumber } from '@agile-ui/utils';
import { HTMLAttributeReferrerPolicy, ReactElement, useMemo } from 'react';
import { cx } from 'twind';
import { isDarkColor, randomColor } from '../utils/color';
import { primitiveComponent } from '../utils/component';
import type { NumberSize } from '../utils/types';
import { AvatarImage } from './AvatarImage';

export type AvatarProps = {
  /**
   * 头像图片地址
   */
  src?: string;

  /**
   * 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像
   */
  srcSet?: string;

  /**
   * 头像名称
   */
  name?: string;

  /**
   * 头像大小
   * @default 'md'
   */
  size?: NumberSize;

  /**
   * 边框圆角
   * @default 'full'
   */
  radius?: NumberSize;

  /**
   * 指示浏览器应当如何加载该图像
   */
  loading?: 'eager' | 'lazy';

  /**
   * 头像加载失败也没有设置头像名称时候显示
   * @default 'DefaultIcon'
   * @type ReactElement
   */
  fallback?: ReactElement;

  /**
   * 引荐来源政策
   * @type HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: HTMLAttributeReferrerPolicy;

  /**
   * 头像加载失败回调
   */
  onError?: () => void;
};

const avatarSizeStyles = {
  xs: '4',
  sm: '7',
  md: '10',
  lg: '14',
  xl: '20',
};

export const getAvatarSizeStyle = (size: NumberSize) => {
  if (isNumber(size)) {
    return `w-[${size}px] h-[${size}px] text-[calc(${size}px/3)]`;
  }

  const sizeNumber = avatarSizeStyles[size];

  return `h-${sizeNumber} w-${sizeNumber} text-[calc(theme(height.${sizeNumber})/3)]`;
};

export const Avatar = primitiveComponent<'div', AvatarProps>((props, ref) => {
  const {
    className,
    children,
    name,
    src,
    srcSet,
    loading,
    referrerPolicy,
    radius = 'full',
    size = 'md',
    onError,
    ...rest
  } = props;

  const rounded = radius ? (isNumber(radius) ? `-[${radius}px]` : `-${radius}`) : '';

  const colorsStyles = useMemo(() => {
    if (name) {
      const backgroundColor = randomColor(name);
      const textColor = isDarkColor(backgroundColor) ? '#DCE3E8' : '#2A3F4D';
      return `bg-[${backgroundColor}] text-[${textColor}]`;
    } else {
      return 'bg-gray-300';
    }
  }, [name]);

  return (
    <div
      ref={ref}
      className={cx(
        'inline-flex items-center justify-center text-center font-medium uppercase relative shrink-0 align-top',
        `rounded${rounded}`,
        colorsStyles,
        getAvatarSizeStyle(size),
        className
      )}
      {...rest}
    >
      <AvatarImage
        rounded={rounded}
        name={name}
        src={src}
        referrerPolicy={referrerPolicy}
        srcSet={srcSet}
        loading={loading}
        onError={onError}
      />
      {children}
    </div>
  );
});

Avatar.displayName = 'Avatar';
