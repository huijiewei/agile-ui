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

    window.addEventListener('pointermove', handlePointer, { capture: true, once: true });
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('pointermove', handlePointer, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [allowHover]);

  return allowHover;
};
