import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-3 pb-3`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a className={`${styles.link} p-5`} href='/'>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </a>
            </li>
            <li>
              <a className={`${styles.link} p-5`} href='/'>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </a>
            </li>
          </ul>
          <a className={styles['logo-link']} href="/">
            <Logo />
          </a>
          <a className={`${styles.link} p-5`} href='/'>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </a>
        </nav>
      </div>
    </header>
  )
}