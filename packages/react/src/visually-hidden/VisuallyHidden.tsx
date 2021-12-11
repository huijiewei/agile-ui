import { __DEV__ } from '@agile-ui/utils';
import { root } from './VisuallyHidden.css';
import { polymorphicComponent } from '../polymorphic/Polymorphic';

const DEFAULT_TAG = 'span';

const VisuallyHidden = polymorphicComponent((props, ref) => {
  const { as: Component = DEFAULT_TAG, ...rest } = props;

  return <Component {...rest} className={root} ref={ref} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
