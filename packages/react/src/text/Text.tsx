import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';

type TextProps = {
  /**
   * The size of the text.
   *
   * The supported values, from smaller size to larger size, are:
   * 'caption', 'copy', 'body', and 'subtitle'
   *
   * @default 'body'
   */
  size?: 'caption' | 'copy' | 'body' | 'subtitle';
  /**
   * The weight of the text font.
   *
   * @default 'regular'
   */
  weight?: 'regular' | 'semibold' | 'bold';
  /**
   * Used to truncate the text to a given number of lines.
   *
   * It will add an ellipsis (`…`) to the text at the end of the last line, only if the text was
   * truncated. If the text fits without it being truncated, no ellipsis is added.
   *
   * By default, the text is not truncated at all, no matter how many lines it takes to render it.
   *
   * @default undefined
   */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5';
  /**
   * How to align the text horizontally.
   *
   * @default 'start'
   */
  align?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
};

export const Text = polymorphicComponent<'span', TextProps>((props, ref) => {
  const { as: Component = 'span', children, ...rest } = props;
  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Text.displayName = 'Text';
}
