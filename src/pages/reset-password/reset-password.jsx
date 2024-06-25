import React, { useCallback, useEffect } from 'react';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css'
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../utils/burger-api';

export default function ResetPassword() {
  const [form, handleChangeInput] = useForm({
    password: '',
    token: '',
  })

  const navigate = useNavigate();

  useEffect(() => {
    const isResetPasswordSend = localStorage.getItem("resetPassword");

    if (!isResetPasswordSend) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmitForm = useCallback(
    async (event) => {
      event.preventDefault();
      console.log(form, 'form reset-password');

      try {
        const response = await resetPassword(form);
        navigate('/login', { replace: true });
        console.log('Ответ при успешной смене пароля:', response);
      } catch (error) {
        console.error('Ответ ошибки при смене пароля:', error);
      }
    },
    [form, navigate]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
          <form action="#" className={`${styles.form} mb-20`} onSubmit={handleSubmitForm}>
            <PasswordInput
              onChange={handleChangeInput}
              value={form.password}
              name={'password'}
              placeholder="Введите новый пароль"
              extraClass="mb-6"
              />
            <Input
              onChange={handleChangeInput}
              value={form.token}
              name={'token'}
              placeholder="Введите код из письма"
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
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
