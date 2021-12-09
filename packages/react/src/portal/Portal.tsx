import { forwardRef, PropsWithChildren, RefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { __DEV__ } from '@agile-ui/utils';
import { useIsomorphicEffect } from '@agile-ui/react-hooks';
import { PolymorphicComponent, Primitive } from '../primitive/Primitive';

const MAX_Z_INDEX = 811223;

const DEFAULT_TAG = 'div';

export type PortalOwnProps = {
  containerRef?: RefObject<HTMLElement>;
};

export const Portal: PolymorphicComponent<PortalOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const { as = DEFAULT_TAG, style, containerRef, ...restProps } = props;

  const hostElement = containerRef?.current ?? globalThis?.document?.body;
  const [, forceUpdate] = useState({});

  useIsomorphicEffect(() => {
    forceUpdate({});
  }, []);

  if (hostElement) {
    return createPortal(
      <Primitive
        as={as}
        {...restProps}
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

export type UnstablePortalProps = {
  container?: HTMLElement | null;
};

export const UnstablePortal = (props: PropsWithChildren<UnstablePortalProps>) => {
  const { container = globalThis?.document?.body, children } = props;
  return container ? createPortal(<>{children}</>, container) : null;
};

if (__DEV__) {
  UnstablePortal.displayName = 'Portal';
}
