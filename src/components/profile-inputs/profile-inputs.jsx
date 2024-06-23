import React, { useEffect, useRef, useState } from 'react'
import styles from './profile-inputs.module.css'
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm';
import { useSelector } from 'react-redux';

export default function ProfileInputs() {
  const [form, handleChangeInput, setValues] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [disableInput, setDisableInput] = useState(true);
  const inputRef = useRef(null);

  const user = useSelector(store => store.user.user);

  useEffect(() => {
    if (user) {
      setValues({
        ...form,
        ...user,
      });
    }
  // если добавить form как рекомендует eslint, то будет бесконечный ререндр 
  // а еще нету поля password в запросе
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValues, user])

  const handleIconClick = () => {
    setDisableInput(false);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }

  const handleBlurInput = () => {
    setDisableInput(true)
  }

  return (
    <div className={styles.inputs}>
      <Input
        onChange={handleChangeInput}
        value={form.name}
        name={'name'}
        type={'text'}
        placeholder={'Имя'}
        extraClass="mb-6"
        icon="EditIcon"
        onIconClick={handleIconClick}
        onBlur={handleBlurInput}
        disabled={disableInput}
        ref={inputRef}
      />
      <EmailInput
        onChange={handleChangeInput}
        value={form.email}
        name={'email'}
        placeholder="Логин"
        extraClass="mb-6"
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={form.password}
        name={'password'}
        placeholder="Пароль"
        extraClass="mb-6"
        icon="EditIcon"
      />
    </div>
  )
}
