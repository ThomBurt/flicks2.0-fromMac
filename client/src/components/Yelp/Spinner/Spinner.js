import React from 'react';
import styles from './Spinner.module.css';
import spinnerImg from '../../Assets/img/Spinner3.gif'
export function Spinner() {
    return (
        <div className={`button is-loading is-large ${styles.spinner}`}><img src={spinnerImg} width="150px" alt='spinner'/></div>
    );
}