import { useEffect, useState } from 'react';

export const useAllowHover = () => {
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    const handlePointer = () => {
      setAllowHover(true);
    };

    const handleKeyDown = () => {
      setAllowHover(false);
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('pointerdown', handlePointer, { capture: true, once: true });
    document.addEventListener('pointermove', handlePointer, { capture: true, once: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('pointerdown', handlePointer, { capture: true });
      document.removeEventListener('pointermove', handlePointer, { capture: true });
    };
  }, []);

  return allowHover;
};
