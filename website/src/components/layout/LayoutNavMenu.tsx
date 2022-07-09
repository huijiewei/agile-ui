import { cx } from 'twind';
import { menus } from '../../data/menus';
import { LayoutNavLink } from './LayoutNavLink';

export const LayoutNavMenu = () => {
  return (
    <nav className={'relative'}>
      <ul className={'space-y-3 p-5'}>
        {menus.map((menu) => (
          <li key={menu.label}>
            <h5 className={'mb-3 font-medium'}>
              {menu.path ? (
                <LayoutNavLink
                  className={({ isActive }) => {
                    return cx('block hover:text-gray-500', isActive && 'text-blue-500');
                  }}
                  to={menu.path}
                >
                  {menu.label}
                </LayoutNavLink>
              ) : (
                menu.label
              )}
            </h5>
            {menu.children && (
              <ul className={'space-y-1 border-l border-l-gray-100'}>
                {menu.children.map((child) => (
                  <li key={child.label}>
                    <LayoutNavLink
                      className={({ isActive }) => {
                        return cx(
                          '-ml-px block border-l border-transparent pl-4 py-1 font-medium',
                          isActive
                            ? 'border-l-blue-300 bg-blue-50 text-blue-500'
                            : 'text-gray-500 hover:(border-l-gray-300 text-gray-700)'
                        );
                      }}
                      to={child.path}
                    >
                      {child.label}
                    </LayoutNavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
