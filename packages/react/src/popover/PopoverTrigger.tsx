import { useMergedRefs } from '@agile-ui/react-hooks';
import { dataAttr } from '@agile-ui/utils';
import { cloneElement, ComponentProps, ReactNode } from 'react';
import { primitiveComponent } from '../utils/component';
import { usePopoverReference } from './PopoverProvider';

type PopoverTriggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ComponentProps<any>;
};

export const PopoverTrigger = primitiveComponent<'div', PopoverTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setReference, getReferenceProps, open } = usePopoverReference();

  const refs = useMergedRefs(setReference, ref);

  return cloneElement(children, {
    'data-active': dataAttr(open),
    ...getReferenceProps({
      ref: refs,
      ...rest,
    }),
  });
});

PopoverTrigger.displayName = 'PopoverTrigger';
