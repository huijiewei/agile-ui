import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../polymorphic/Polymorphic';
import { root } from './VisuallyHidden.css';

const DEFAULT_TAG = 'span';

const VisuallyHidden = polymorphicComponent<typeof DEFAULT_TAG>((props, ref) => {
  const { as: Component = DEFAULT_TAG, ...rest } = props;

  return <Component {...rest} className={root} ref={ref} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
