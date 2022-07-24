import { useConst } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import type { ReactElement } from 'react';
import { useEffect, useId, useMemo } from 'react';
import { PresenceContext, PresenceContextProps } from './PresenceContext';

type PresenceChildProps = {
  children: ReactElement;
  isPresent: boolean;
  initial?: false | string | string[];
  onExitComplete?: () => void;
  presenceAffectsLayout: boolean;
};

export const PresenceChild = ({
  children,
  isPresent,
  initial,
  onExitComplete,
  presenceAffectsLayout,
}: PresenceChildProps) => {
  const presenceChildren = useConst<Map<string, boolean>>(() => {
    return new Map();
  });

  const id = useId();

  const context = useMemo(
    (): PresenceContextProps => ({
      id,
      initial,
      isPresent,
      onExitComplete: (childId: string) => {
        presenceChildren.set(childId, true);

        for (const isComplete of presenceChildren.values()) {
          if (!isComplete) return;
        }

        onExitComplete?.();
      },
      register: (childId: string) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    presenceAffectsLayout ? undefined : [isPresent]
  );

  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  return <PresenceContext.Provider value={context}>{children}</PresenceContext.Provider>;
};

if (__DEV__) {
  PresenceChild.displayName = 'PresenceChild';
}
