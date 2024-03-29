import { NavLink, NavLinkProps } from 'react-router-dom';
import { cx } from '@twind/core';
import { Menu, menus } from '../../data/menus';
import { useLayoutAsideCollapsedDispatch } from './LayoutProvider';

const MenuLink = (props: NavLinkProps) => {
  const dispatch = useLayoutAsideCollapsedDispatch();

  return <NavLink onClick={() => dispatch(false)} {...props}></NavLink>;
};

const MenuItem = ({ menu, deep }: { menu: Menu; deep: number }) => {
  return (
    <li className={''}>
      {menu.path ? (
        <MenuLink
          className={({ isActive }) => {
            return cx(
              'block py-1',
              `pl-${deep * 2}`,
              isActive ? 'bg-blue-50 text-blue-500' : 'hover:(text-gray-500 bg-gray-50) text-gray-600'
            );
          }}
          to={menu.path}
        >
          {menu.label}
        </MenuLink>
      ) : (
        <h5 className={deep > 1 ? `mb-1 font-normal text-gray-400 pl-${deep * 2}` : 'mb-2'}>{menu.label}</h5>
      )}
      {menu.children && (
        <ul className={'space-y-1'}>
          {menu.children.map((child) => (
            <MenuItem deep={deep + 1} key={child.label} menu={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const LayoutAsideMenu = () => {
  return (
    <nav role={'navigation'} className={'relative font-medium'}>
      <ul className={'space-y-3 p-4'}>
        {menus.map((menu) => (
          <MenuItem key={menu.label} menu={menu} deep={1} />
        ))}
      </ul>
    </nav>
  );
};
