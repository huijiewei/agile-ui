import { useForceUpdate, useIsMounted, useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import type { StringOrNumber } from '@agile-ui/utils';
import { __DEV__ } from '@agile-ui/utils';
import type { PropsWithChildren } from 'react';
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useRef } from 'react';
import { PresenceChild } from './PresenceChild';

export type PresenceProps = {
  initial?: boolean;
  onExitComplete?: () => void;
  exitBeforeEnter?: boolean;
  presenceAffectsLayout?: boolean;
};

export const Presence = ({
  children,
  initial = true,
  onExitComplete,
  exitBeforeEnter,
  presenceAffectsLayout = true,
}: PropsWithChildren<PresenceProps>) => {
  const forceRender = useForceUpdate();
  const mounted = useIsMounted();

  const filteredChildren = onlyElements(children);

  let childrenToRender = filteredChildren;

  const exiting = new Set<StringOrNumber>();

  const presentChildren = useRef(childrenToRender);

  const allChildren = useRef(new Map<StringOrNumber, ReactElement>()).current;

  const isInitialRender = useRef(true);

  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });

  useEffect(() => {
    return () => {
      isInitialRender.current = true;
      allChildren.clear();
      exiting.clear();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitialRender.current) {
    return (
      <>
        {childrenToRender.map((child) => (
          <PresenceChild
            key={getChildKey(child)}
            isPresent
            initial={initial ? undefined : false}
            presenceAffectsLayout={presenceAffectsLayout}
          >
            {child}
          </PresenceChild>
        ))}
      </>
    );
  }

  childrenToRender = [...childrenToRender];

  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);

  const numPresent = presentKeys.length;

  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];

    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    }
  }

  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  }

  exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1) {
      return;
    }

    const child = allChildren.get(key);

    if (!child) {
      return;
    }

    const insertionIndex = presentKeys.indexOf(key);

    childrenToRender.splice(
      insertionIndex,
      0,
      <PresenceChild
        key={getChildKey(child)}
        isPresent={false}
        onExitComplete={() => {
          allChildren.delete(key);
          exiting.delete(key);

          const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
          presentChildren.current.splice(removeIndex, 1);

          // Defer re-rendering until all exiting children have indeed left
          if (!exiting.size) {
            presentChildren.current = filteredChildren;

            if (!mounted.current) {
              return;
            }

            forceRender();
            onExitComplete?.();
          }
        }}
        presenceAffectsLayout={presenceAffectsLayout}
      >
        {child}
      </PresenceChild>
    );
  });

  childrenToRender = childrenToRender.map((child) => {
    const key = child.key as StringOrNumber;

    return exiting.has(key) ? (
      child
    ) : (
      <PresenceChild key={getChildKey(child)} isPresent presenceAffectsLayout={presenceAffectsLayout}>
        {child}
      </PresenceChild>
    );
  });

  if (__DEV__ && exitBeforeEnter && childrenToRender.length > 1) {
    console.warn(
      `You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.`
    );
  }

  return <>{exiting.size ? childrenToRender : childrenToRender.map((child) => cloneElement(child))}</>;
};

if (__DEV__) {
  Presence.displayName = 'Presence';
}

const onlyElements = (children: ReactNode): ReactElement[] => {
  const filtered: ReactElement[] = [];

  Children.forEach(children, (child, index) => {
    if (isValidElement(child)) {
      if (!child.key) {
        filtered.push(
          cloneElement(child, {
            key: index,
          })
        );
      } else {
        filtered.push(child);
      }
    }
  });

  return filtered;
};

const getChildKey = (child: ReactElement): StringOrNumber => child.key || '';

const updateChildLookup = (children: ReactElement[], allChildren: Map<StringOrNumber, ReactElement>) => {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
};
