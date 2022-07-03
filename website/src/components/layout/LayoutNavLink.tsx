import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
import { useLayerDispatch } from './Layout';

export const LayoutNavLink = (props: NavLinkProps) => {
  const layerDispatch = useLayerDispatch();

  return <NavLink onClick={() => layerDispatch(false)} {...props}></NavLink>;
};
