import React from 'react';
import styles from './Button.module.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  return (
    <button 
      type={type} 
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
