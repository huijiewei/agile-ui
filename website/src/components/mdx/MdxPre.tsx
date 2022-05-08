import { ComponentProps, isValidElement } from 'react';
import { ReactLiveBox } from '../react-live/ReactLiveBox';

export const MdxPre = (props: ComponentProps<'pre'>) => {
  return <ReactLiveBox {...(isValidElement(props.children) ? props.children?.props : { ...props })} />;
};
