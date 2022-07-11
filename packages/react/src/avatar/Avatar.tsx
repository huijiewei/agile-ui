import { __DEV__, isNumber } from '@agile-ui/utils';
import { cloneElement, HTMLAttributeReferrerPolicy, ReactElement, SVGProps, useMemo } from 'react';
import { cx } from 'twind';
import type { ImageProps } from '../image/Image';
import { useImage } from '../image/useImage';
import { isDarkColor, randomColor } from '../utils/color';
import { primitiveComponent, PrimitiveComponentProps } from '../utils/component';
import type { NumberSize } from '../utils/types';

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
      />
      {children}
    </div>
  );
});

if (__DEV__) {
  Avatar.displayName = 'Avatar';
}

type AvatarImageProps = ImageProps & Pick<AvatarProps, 'name' | 'fallback'> & { rounded: string };

const DefaultIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" color="#fff" width="100%" height="100%" {...props}>
    <path
      fill="currentColor"
      d="M103 102.139C93.094 111.92 79.35 118 64.164 118c-15.358 0-29.235-6.232-39.164-16.21V95.2C25 86.81 31.981 80 40.6 80h46.8c8.619 0 15.6 6.81 15.6 15.2v6.939zM63.996 24C51.294 24 41 34.294 41 46.996 41 59.706 51.294 70 63.996 70 76.7 70 87 59.706 87 46.996 87 34.294 76.699 24 63.996 24"
    />
  </svg>
);

const initials = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : firstName.charAt(0);
};

const AvatarImage = (props: PrimitiveComponentProps<'img', AvatarImageProps>) => {
  const { name, src, srcSet, onError, rounded, loading, referrerPolicy, fallback = <DefaultIcon /> } = props;

  const status = useImage({ src, onError });

  if (status != 'loaded') {
    if (name) {
      return (
        <div role="img" aria-label={name}>
          {initials(name)}
        </div>
      );
    }

    return cloneElement(fallback, {
      role: 'img',
    });
  }

  return (
    <img
      alt={name}
      src={src}
      srcSet={srcSet}
      loading={loading}
      referrerPolicy={referrerPolicy}
      className={`rounded${rounded} w-full h-full object-cover`}
    />
  );
};

if (__DEV__) {
  AvatarImage.displayName = 'AvatarImage';
}
