import React, { useEffect, useRef, useState } from 'react'
import styles from './profile-inputs.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../services/user/actions';
import loaderImg from '../../images/svg/bouncing-loader.svg'

export default function ProfileInputs() {
  const dispatch = useDispatch();
  const [form, handleChangeInput, setValues] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [disableInput, setDisableInput] = useState(true);
  const inputRef = useRef(null);

  const { user, isLoading } = useSelector(store => store.user);
  const [isButtonsActive, setIsButtonsActive] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        ...form,
        ...user,
      });
    }
    // если добавить form как рекомендует eslint, то будет бесконечный ререндр 
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

  const shallowEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    // {...user, password: ''} такая запись тк с сервера не приходит пароль, а в form он изначально '';
    if (!shallowEqual(form, { ...user, password: '' })) {
      setIsButtonsActive(true);
    } else {
      setIsButtonsActive(false);
    }
  }, [form, user])

  const handleSubmitForm = (event) => {
    event.preventDefault();
    
    dispatch(updateUserData(form));

    setValues({
      ...user,
      ...form,
      password: '',
    });
  }

  const handleResetForm = (event) => {
    event.preventDefault();
    setValues({
      ...user,
      password: '',
    });
  }

  return (
    <div className={styles.inputs}>
      <form action="#" onSubmit={handleSubmitForm} onReset={handleResetForm}>
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
        {isButtonsActive && <div className={styles.buttons}>
          <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium" style={{ position: 'relative' }}>
            {isLoading && <img className={styles.loader} src={loaderImg} width={40} height={40} alt="Loading" />}
            <span className={isLoading ? styles.loading : ''}>Сохранить</span>
          </Button>
        </div>}
      </form>
    </div>
  )
}
