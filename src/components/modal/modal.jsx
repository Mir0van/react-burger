import React, { useEffect } from 'react'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals");

export default function Modal({ header, children, onCloseClick, setIsModalRendered, isModalRendered }) {

  useEffect(() => {
    setIsModalRendered(true)
  }, [setIsModalRendered])

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        onCloseClick();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseClick]);

  return ReactDOM.createPortal(
    (
      <div className={`${styles.modal} ${isModalRendered && styles.visible}`}>
        <div className={styles.wrapper}>
          <ModalOverlay onCloseClick={onCloseClick} />
          <div className={styles.content}>
            <div className={styles.header}>
              <p className='text text_type_main-large mt-3'>{header}</p>
              <button className={styles.close_btn} onClick={onCloseClick}>
                <CloseIcon />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  setIsModalRendered: PropTypes.func.isRequired,
  isModalRendered: PropTypes.bool.isRequired,
};
