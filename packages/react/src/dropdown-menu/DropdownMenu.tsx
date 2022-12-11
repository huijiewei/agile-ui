import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';
import { DropdownMenuComponent, DropdownMenuProps } from './DropdownMenuComponent';

export const DropdownMenu = (props: PropsWithChildren<DropdownMenuProps>) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <DropdownMenuComponent {...props} />
      </FloatingTree>
    );
  }

  return <DropdownMenuComponent {...props} />;
};

DropdownMenu.displayName = 'DropdownMenu';
