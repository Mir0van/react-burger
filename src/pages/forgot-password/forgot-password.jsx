import React, { useCallback, useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css'
import { useForm } from '../../hooks/useForm';

export default function ForgotPassword() {
  const [form, handleChangeInput] = useForm({
    email: '',
  })

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      // тут будет логика отправки данных пользователя
      console.log(form, 'form forgot-password');
    },
    [form]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
          <form action="#" className={`${styles.form} mb-20`}>
            <EmailInput
              onChange={handleChangeInput}
              value={form.email}
              name={'email'}
              placeholder="Укажите e-mail"
              extraClass="mb-6"
              />
            <Button htmlType="submit" type="primary" size="medium" onClick={handleSubmitForm}>
              Восстановить
            </Button>
          </form>
          <div className={`${styles['link-wrapper']}`}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
