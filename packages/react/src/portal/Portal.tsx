import { FloatingPortal } from '@floating-ui/react';
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

Portal.displayName = 'Portal';
