import React, {FormEvent, useCallback} from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import styles from './login.module.css'
import { useDispatch } from '../../services/store';
import { login } from '../../services/user/actions';

export default function Login() {
  const dispatch = useDispatch();

  const [form, handleChangeInput] = useForm({
    email: '',
    password: '',
  })

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // тут будет логика отправки данных пользователя
      dispatch(login(form))
    },
    [dispatch, form]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Вход</h1>
          <form action="#" className={`${styles.form} mb-20`} onSubmit={handleSubmitForm}>
            <EmailInput
              onChange={handleChangeInput}
              value={form.email}
              name={'email'}
              placeholder="E-mail"
              extraClass="mb-6"
              />
            <PasswordInput
              onChange={handleChangeInput}
              value={form.password}
              name={'password'}
              placeholder="Пароль"
              extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
              Войти
            </Button>
          </form>
          <div className={`${styles['link-wrapper']} mb-4`}>
            <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
            <Link to='/register' className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link>
          </div>
          <div className={styles['link-wrapper']}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link to='/forgot-password' className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
