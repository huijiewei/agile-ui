import { omit } from '@agile-ui/utils';
import type { ReactElement } from 'react';
import { isValidElement } from 'react';
import { primitiveComponent } from '../utils/component';
import { useImage, useImageProps } from './useImage';

export type ImageProps = useImageProps & {
  /**
   * 图片加载失败时的显示, 可以是 URL 或者 ReactElement
   */
  fallback?: string | ReactElement;
};

export const Image = primitiveComponent<'img', ImageProps>((props, ref) => {
  const { src, srcSet, sizes, alt, fallback, loading, crossOrigin, referrerPolicy, ...rest } = props;

  const status = useImage(props);

  if (status == 'failed') {
    if (isValidElement(fallback)) {
      return fallback;
    }

    return <img alt={'图片加载失败'} ref={ref} src={fallback} {...omit(rest, ['onLoad', 'onError'])} />;
  }

  return (
    <img
      alt={alt}
      sizes={sizes}
      crossOrigin={crossOrigin}
      referrerPolicy={referrerPolicy}
      loading={loading}
      ref={ref}
      src={src}
      srcSet={srcSet}
      {...rest}
    />
  );
});

Image.displayName = 'Image';
