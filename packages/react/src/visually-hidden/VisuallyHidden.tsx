import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';
import { root } from './VisuallyHidden.css';

const VisuallyHidden = polymorphicComponent<'span'>((props, ref) => {
  const { as: Component = 'span', ...rest } = props;

  return <Component {...rest} className={root} ref={ref} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
