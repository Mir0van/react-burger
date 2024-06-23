import React, { useCallback } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css'
import { useForm } from '../../hooks/useForm';
import { forgotPassword } from '../../utils/burger-api';

export default function ForgotPassword() {
  const [form, handleChangeInput] = useForm({
    email: '',
  })

  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    async (event) => {
      event.preventDefault();
      console.log(form, 'form forgot-password');

      try {
        const response = await forgotPassword(form);
        navigate('/reset-password')
        console.log('Ответ при успешном сбросе пароля:', response);
      } catch (error) {
        console.error('Ответ ошибки сброса пароля:', error);
      }
    },
    [form, navigate]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
          <form className={`${styles.form} mb-20`} onSubmit={handleSubmitForm}>
            <EmailInput
              onChange={handleChangeInput}
              value={form.email}
              name={'email'}
              placeholder="Укажите e-mail"
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
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
