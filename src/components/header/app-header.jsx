import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AppHeader() {
  const user = useSelector(store => store.user.user)

  const location = useLocation();
  const LogoWrapper = location.pathname === '/' ? 'div' : NavLink;

  return (
    <header className={`${styles.header} pt-3 pb-3`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink className={`${styles.link} p-5`} to='/' >
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default ${!isActive && 'text_color_inactive'}`}>Конструктор</p>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink className={`${styles.link} p-5`} to='/feed'>
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default ${!isActive && 'text_color_inactive'}`}>Лента заказов</p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <LogoWrapper className={styles['logo-link']} to="/">
            <Logo />
          </LogoWrapper>
          <NavLink className={`${styles.link} p-5`} to='/profile'>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <p className={`text text_type_main-default ${!isActive && 'text_color_inactive'}`}>
                  {user?.name || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}