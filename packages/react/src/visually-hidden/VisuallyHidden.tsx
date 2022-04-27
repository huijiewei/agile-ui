import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';

const VisuallyHidden = polymorphicComponent<'span'>((props, ref) => {
  const { as: Component = 'span', ...rest } = props;

  return <Component {...rest} className={'sr-only'} ref={ref} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = '@agile-ui/react/VisuallyHidden';
}
