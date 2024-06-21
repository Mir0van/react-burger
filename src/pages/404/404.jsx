import React from 'react';
import styles from './404.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-large">Страница не найдена... D=</p>
      <Link to='/'>
        <Button htmlType="button" type="primary" size="medium">
          На главную
        </Button>
      </Link>
    </div>
  )
}
