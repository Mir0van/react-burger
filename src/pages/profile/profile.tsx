import React from 'react';
import styles from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleExitClick = () => {
    // @ts-ignore
    dispatch(logout());
  }

  const getText = () => {
    switch (location.pathname) {
      case '/profile':
        return 'изменить свои персональные данные';
      case '/profile/orders':
        return 'просмотреть историю своих заказов';
      default:
        return '';
    }
  };

  return (
    <section className='pt-30'>
      <h1 className='visually-hidden'>Профиль</h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink
                  to="/profile"
                  end={true}
                  className={({ isActive }) =>
                    `text text_type_main-medium ${styles.link} ${isActive ? styles['link--color'] : 'text_color_inactive'}`
                  }
                >
                  Профиль
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to="/profile/orders"
                  className={({ isActive }) =>
                    `text text_type_main-medium ${styles.link} ${isActive ? styles['link--color'] : 'text_color_inactive'}`
                  }
                >
                  История заказов
                </NavLink>
              </li>
              <li className={styles.item}>
                <button className={`text text_type_main-medium text_color_inactive ${styles.link}`} onClick={handleExitClick}>Выход</button>
              </li>
            </ul>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
              В этом разделе вы можете <br />
              {getText()}
            </p>
          </div>

          <Outlet />

        </div>
      </div>
    </section>
  )
}
