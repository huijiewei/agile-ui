import { RefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { __DEV__ } from '@agile-ui/utils';
import { useIsomorphicEffect } from '@agile-ui/react-hooks';
import { polymorphicComponent } from '../polymorphic/Polymorphic';

const MAX_Z_INDEX = 811223;

const DEFAULT_TAG = 'div';

export type PortalOwnProps = {
  containerRef?: RefObject<HTMLElement>;
};

export const Portal = polymorphicComponent<typeof DEFAULT_TAG, PortalOwnProps>((props, ref) => {
  const { as: Component = DEFAULT_TAG, style, containerRef, ...restProps } = props;

  const hostElement = containerRef?.current ?? globalThis?.document?.body;
  const [, forceUpdate] = useState({});

  useIsomorphicEffect(() => {
    forceUpdate({});
  }, []);

  if (hostElement) {
    return createPortal(
      <Component
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
