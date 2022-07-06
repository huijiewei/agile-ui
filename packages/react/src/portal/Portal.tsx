import { __DEV__ } from '@agile-ui/utils';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import type { ReactNode } from 'react';

export type PortalProps = {
  children?: ReactNode;
  id?: string;
  root?: HTMLElement | null;
};

export const Portal = ({ children, id = 'agile-ui-root', root = null }: PortalProps) => {
  return (
    <FloatingPortal id={id} root={root}>
      {children}
    </FloatingPortal>
  );
};

if (__DEV__) {
  Portal.displayName = 'Portal';
}
