import { polymorphicComponent } from '../utils/component';

export const Box = polymorphicComponent((props, ref) => {
  const { as: Component = 'div', ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Box.displayName = 'Box';
