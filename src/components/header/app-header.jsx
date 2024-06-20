import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-3 pb-3`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink className={`${styles.link} p-5`} to='/'>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink className={`${styles.link} p-5`} to='/'>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </NavLink>
            </li>
          </ul>
          <NavLink className={styles['logo-link']} to="/">
            <Logo />
          </NavLink>
          <NavLink className={`${styles.link} p-5`} to='/'>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}