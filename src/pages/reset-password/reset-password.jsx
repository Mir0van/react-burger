import React, { useCallback, useState } from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css'
import { useForm } from '../../hooks/useForm';

export default function ResetPassword() {
  const [form, handleChangeInput] = useForm({
    email: '',
    code: '',
  })

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      // тут будет логика отправки данных пользователя
      console.log(form, 'form reset-password');
    },
    [form]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
          <form action="#" className={`${styles.form} mb-20`}>
            <PasswordInput
              onChange={handleChangeInput}
              value={form.email}
              name={'password'}
              placeholder="Введите новый пароль"
              extraClass="mb-6"
              />
            <Input
              onChange={handleChangeInput}
              value={form.code}
              name={'code'}
              placeholder="Введите код из письма"
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" onClick={handleSubmitForm}>
              Сохранить
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
