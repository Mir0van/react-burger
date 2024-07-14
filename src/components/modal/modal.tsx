import React, { useEffect } from 'react'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals") as HTMLElement;

type TModalProps = {
  header: string;
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
      <div className={`${styles.modal}`}>
        <div className={styles.wrapper}>
          <ModalOverlay onClose={onClose} />
          <div className={styles.content}>
            <div className={styles.header}>
              <p className='text text_type_main-large mt-3'>{header}</p>
              <button className={styles.close_btn} onClick={onClose}>
                <CloseIcon type='primary' />
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
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
