import React from 'react'
import styles from './modal-overlay.module.css'

export default function ModalOverlay({onCloseClick}) {
  return (
    <div className={styles.overlay} onClick={onCloseClick} />
  )
}
