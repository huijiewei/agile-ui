import { __DEV__ } from '@agile-ui/utils';
import { root } from './VisuallyHidden.css';
import { polymorphicComponent } from '../polymorphic/Polymorphic';

const DEFAULT_TAG = 'span';

const VisuallyHidden = polymorphicComponent((props, ref) => {
  const { as: Component = DEFAULT_TAG, ...restProps } = props;

  return <Component className={root} ref={ref} {...restProps} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
