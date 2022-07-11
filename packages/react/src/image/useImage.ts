import { useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

export type useImageProps = {
  /**
   * 图像的 URL
   */
  src?: string;

  /**
   * 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset
   */
  srcSet?: string;

  /**
   * 表示资源大小的、以逗号隔开的一个或多个字符串
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-sizes
   */
  sizes?: string;

  /**
   * 指示浏览器应当如何加载该图像
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-loading
   */
  loading?: 'eager' | 'lazy';

  /**
   * 图像加载成功回调
   */
  onLoad?: (event: ImageEvent) => void;

  /**
   * 图像加载失败回调
   */
  onError?: (event: ImageEvent) => void;
};

type Status = 'loading' | 'failed' | 'pending' | 'loaded';
type ImageEvent = SyntheticEvent<HTMLImageElement, Event>;

export const useImage = (props: useImageProps) => {
  const { loading, src, srcSet, sizes, onLoad, onError } = props;

  const [status, setStatus] = useState<Status>('pending');

  useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const imageRef = useRef<HTMLImageElement | null>();

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  const load = useCallback(() => {
    if (!src) {
      return;
    }

    flush();

    const img = new Image();
    img.src = src;

    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    img.onload = (event) => {
      flush();
      setStatus('loaded');
      onLoad?.(event as unknown as ImageEvent);
    };

    img.onerror = (error) => {
      flush();
      setStatus('failed');
      onError?.(error as unknown as ImageEvent);
    };

    imageRef.current = img;
  }, [src, srcSet, sizes, onLoad, onError, loading]);

  useIsomorphicLayoutEffect(() => {
    if (status === 'loading') {
      load();
    }

    return () => {
      flush();
    };
  }, [status, load]);

  return status;
};
