import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { cloneElement, ComponentProps, ReactNode } from 'react';
import { primitiveComponent } from '../utils/component';
import { usePopover } from './PopoverProvider';

type PopoverTriggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ComponentProps<any>;
};

export const PopoverTrigger = primitiveComponent<'div', PopoverTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { reference, getReferenceProps } = usePopover();

  const refs = useMergedRefs(reference, ref);

  return cloneElement(children, {
    ...getReferenceProps({
      ...rest,
      ref: refs,
    }),
  });
});

if (__DEV__) {
  PopoverTrigger.displayName = 'PopoverTrigger';
}
