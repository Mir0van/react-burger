import React from 'react';
import styles from './loader.module.css';
import loader from '../../images/svg/loader.svg'

export default function Loader() {
  return (
    // <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
    //   <path fill='#3A889C' stroke='#3A889C' stroke-width='15' transform-origin='center' d='m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z'>
    //     <animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='2' values='0;120' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform>
    //   </path>
    // </svg>
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#3A889C" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="1.5" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="1.5" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="1.5" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
    <div className={styles.wrapper}>
      <img src={loader} width={300} height={300} alt="Loader" />
    </div>
  )
}
