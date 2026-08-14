import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(({ label, id, error, className = '', containerClassName = '', actionLink, ...props }, ref) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {label && (
        <div className={styles.labelWrapper}>
          <label htmlFor={id} className={styles.label}>{label}</label>
          {actionLink && (
            <div className={styles.actionLink}>
              {actionLink}
            </div>
          )}
        </div>
      )}
      <div className={styles.inputWrapper}>
        <input 
          id={id}
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
