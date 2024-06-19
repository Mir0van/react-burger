import React from 'react';
import styles from './layout.module.css';
import AppHeader from '../header/app-header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <Outlet />
    </div>
  )
}
