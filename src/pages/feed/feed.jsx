import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Feed() {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-large">Страница в разработке</p>
      <Link to='/'>
        <Button htmlType="button" type="primary" size="medium">
          На главную
        </Button>
      </Link>
    </div>
  )
}
