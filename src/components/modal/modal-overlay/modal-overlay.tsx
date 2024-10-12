import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};

export default function ModalOverlay({onClose}: TModalOverlayProps): React.JSX.Element {
  return (
    <div className={styles.overlay} onClick={onClose} data-testid='modal-overlay'/>
  )
}
