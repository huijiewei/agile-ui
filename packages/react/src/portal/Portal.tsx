import { useIsomorphicEffect } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { RefObject, useState } from 'react';
import { createPortal } from 'react-dom';
import { polymorphicComponent } from '../utils/polymorphic';

const MAX_Z_INDEX = 811223;

type PortalProps = {
  containerRef?: RefObject<HTMLElement>;
};

export const Portal = polymorphicComponent<'div', PortalProps>((props, ref) => {
  const { as: Component = 'div', style, containerRef, ...rest } = props;

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
