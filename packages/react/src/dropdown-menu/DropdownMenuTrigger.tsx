import { useMergedRefs } from '@agile-ui/react-hooks';
import { dataAttr } from '@agile-ui/utils';
import { cloneElement, ComponentProps, ReactNode } from 'react';
import { primitiveComponent } from '../utils/component';
import { useDropdownMenuReference } from './DropdownMenuProvider';

type DropdownMenuTriggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ComponentProps<any>;
};

export const DropdownMenuTrigger = primitiveComponent<'div', DropdownMenuTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setReference, getReferenceProps, open } = useDropdownMenuReference();

  const refs = useMergedRefs(ref, setReference);

  return cloneElement(children, {
    'data-active': dataAttr(open),
    ...getReferenceProps({
      ...rest,
      ref: refs,
    }),
  });
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
