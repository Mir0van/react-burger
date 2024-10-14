import React, { useEffect } from 'react'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals") as HTMLElement;

type TModalProps = {
  header?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ header, children, onClose }: TModalProps): React.JSX.Element {

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <div className={`${styles.modal}`} data-testid='modal'>
        <div className={styles.wrapper}>
          <ModalOverlay onClose={onClose} />
          <div className={styles.content}>
            {header ? (
              <div className={styles.header}>
                <p className='text text_type_main-large mt-3'>{header}</p>
                <button className={styles.close_btn} onClick={onClose} data-testid='modal-close-button'>
                  <CloseIcon type='primary' />
                </button>
              </div>
            ) : (
              <button className={`${styles.close_btn} ${styles.close_btn__float}`} onClick={onClose} data-testid='modal-close-button'>
                <CloseIcon type='primary' />
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    ),
    modalRoot
  );
}
