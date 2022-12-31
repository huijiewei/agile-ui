import { useEffect, useState } from 'react';

export const useAllowHover = () => {
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType == 'mouse') {
        setAllowHover(true);
      }
    };

    const handleKeyDown = () => {
      setAllowHover(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { capture: true, once: true });
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [allowHover]);

  return allowHover;
};
