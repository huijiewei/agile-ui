import { Booleanish } from './types';

export const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined);

export const mergeEventHandlers = <E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (!checkForDefaultPrevented || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
};
