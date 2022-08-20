import type { ImageProps } from '../image/Image';
import { cloneElement, SVGProps } from 'react';
import type { PrimitiveComponentProps } from '../utils/component';
import { useImage } from '../image/useImage';
import type { AvatarProps } from './Avatar';

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

export const AvatarImage = (props: PrimitiveComponentProps<'img', AvatarImageProps>) => {
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
