import React, {FormEvent, useCallback} from 'react';
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import styles from './register.module.css'
import {useForm} from '../../hooks/useForm';
import { useDispatch } from '../../services/store';
import {register} from '../../services/user/actions';

export default function Register() {
  const dispatch = useDispatch();

  const [form, handleChangeInput] = useForm({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(register(form))
      console.log(form, 'form register');
    },
    [dispatch, form]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <form action="#" className={`${styles.form} mb-20`} onSubmit={handleSubmitForm}>
            <Input
                onChange={handleChangeInput}
                value={form.name}
                name={'name'}
                type={'text'}
                placeholder={'Имя'}
                extraClass="mb-6"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
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
              Зарегистрироваться
            </Button>
          </form>
          <div className={`${styles['link-wrapper']}`}>
            <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
            <Link to={'/login'} className={`${styles.link} text text_type_main-default`}>Войти</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
