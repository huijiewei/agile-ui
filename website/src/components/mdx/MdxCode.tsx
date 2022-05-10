import { Children, ComponentProps, isValidElement } from 'react';
import { ReactLiveBox } from '../react-live/ReactLiveBox';

const inlineElements = ['a', 'b', 'big', 'i', 'span', 'em', 'strong', 'sup', 'sub', 'small'];

export const MdxCode = (props: ComponentProps<'code'>) => {
  const shouldBeInline = Children.toArray(props.children).every(
    (el) =>
      (typeof el === 'string' && !el.includes('\n')) ||
      (isValidElement(el) && inlineElements.includes(el.props.mdxType))
  );

  return shouldBeInline ? <code {...props} /> : <ReactLiveBox {...(props as ComponentProps<typeof ReactLiveBox>)} />;
};