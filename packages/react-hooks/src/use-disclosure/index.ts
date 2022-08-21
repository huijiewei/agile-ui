import { useState } from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { useControllableProp } from '../use-controllable';

export type UseDisclosureOptions = {
  opened?: boolean;
  defaultOpened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export function useDisclosure({ opened, defaultOpened, onOpen, onClose }: UseDisclosureOptions) {
  const onOpenRef = useCallbackRef(onOpen);
  const onCloseRef = useCallbackRef(onClose);

  const [openState, setOpenState] = useState(defaultOpened || false);
  const [controlled, controlledOpen] = useControllableProp(opened, openState);

  const handleOpen = () => {
    if (controlledOpen) {
      return;
    }

    if (!controlled) {
      setOpenState(true);
    }

    onOpenRef();
  };

  const handleClose = () => {
    if (!controlledOpen) {
      return;
    }

    if (!controlled) {
      setOpenState(false);
    }

    onCloseRef();
  };

  const handleToggle = () => {
    controlledOpen ? handleClose() : handleOpen();
  };

  return {
    open: controlledOpen,
    controlled,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
