import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/component';
import { useDropdownMenuReference } from './DropdownMenuProvider';

export const DropdownMenuTrigger = polymorphicComponent<'button'>((props, ref) => {
  const { as: Component = 'button', children, ...rest } = props;

  const { reference, getReferenceProps, open } = useDropdownMenuReference();

  const refs = useMergedRefs(reference, ref);

  return (
    <Component
      ref={refs}
      data-active={dataAttr(open)}
      {...getReferenceProps({
        ...rest,
      })}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
}
