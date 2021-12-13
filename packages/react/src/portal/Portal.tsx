import { useIsomorphicEffect } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { RefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { polymorphicComponent } from '../polymorphic/Polymorphic';

const MAX_Z_INDEX = 811223;

const DEFAULT_TAG = 'div';

type PortalProps = {
  containerRef?: RefObject<HTMLElement>;
};

export const Portal = polymorphicComponent<typeof DEFAULT_TAG, PortalProps>((props, ref) => {
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
