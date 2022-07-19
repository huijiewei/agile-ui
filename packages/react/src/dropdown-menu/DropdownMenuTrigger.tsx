import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { cloneElement, ComponentProps, ReactNode } from 'react';
import { primitiveComponent } from '../utils/component';
import { useDropdownMenu } from './DropdownMenuProvider';

type DropdownMenuTriggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ComponentProps<any>;
};

export const DropdownMenuTrigger = primitiveComponent<'div', DropdownMenuTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { reference, getReferenceProps } = useDropdownMenu();

  const refs = useMergedRefs(reference, ref);

  return cloneElement(children, {
    ...getReferenceProps({
      ...rest,
      ref: refs,
    }),
  });
});

if (__DEV__) {
  DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
}
