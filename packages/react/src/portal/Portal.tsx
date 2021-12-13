import { ElementType, forwardRef, ReactElement, RefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { __DEV__ } from '@agile-ui/utils';
import { useIsomorphicEffect } from '@agile-ui/react-hooks';
import { PolymorphicComponentProps } from '@agile-ui/react';

const MAX_Z_INDEX = 811223;

const DEFAULT_TAG = 'div';

type Props = {
  containerRef?: RefObject<HTMLElement>;
};

export type PortalProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

type PortalComponent = <C extends ElementType = typeof DEFAULT_TAG>(props: PortalProps<C>) => ReactElement | null;

export const Portal: PortalComponent & { displayName?: string } = forwardRef((props, ref) => {
  const { as: Component = DEFAULT_TAG, style, containerRef, ...rest } = props;

  const hostElement = containerRef?.current ?? globalThis?.document?.body;
  const [, forceUpdate] = useState({});

  useIsomorphicEffect(() => {
    forceUpdate({});
  }, []);

  if (hostElement) {
    return createPortal(
      <Component
        {...rest}
        ref={ref}
        style={
          hostElement === document.body
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: MAX_Z_INDEX,
                ...style,
              }
            : undefined
        }
      />,
      hostElement
    );
  }

  return null;
});

if (__DEV__) {
  Portal.displayName = 'Portal';
}
