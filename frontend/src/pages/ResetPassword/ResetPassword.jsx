import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './ResetPassword.module.css';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset submitted');
  };

  return (
    <div className={styles.pageContainer}>
      {/* Decorative background element */}
      <div className={styles.decorativeBackground}></div>
      
      <main className={styles.mainContent}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <h1 className="text-display-md text-primary">TutorDesk</h1>
          <p className={styles.brandSubtitle}>Academic Workspace</p>
        </div>

        {/* Reset Password Card */}
        <div className={styles.card}>
          <h2 className="text-title-lg text-on-surface mb-2 text-center">Reset your password</h2>
          <p className={styles.cardSubtitle}>
            Please enter a new password for your account.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* New Password Field */}
            <div className={styles.passwordGroup}>
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                label="New Password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={styles.passwordInputSpacing}
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                title="Toggle password visibility"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>

              {/* Password Strength Meter */}
              <div className={styles.strengthMeterContainer}>
                <div className={styles.strengthBars}>
                  <div className={`${styles.strengthBar} ${styles.strengthActive}`}></div>
                  <div className={`${styles.strengthBar} ${styles.strengthActive}`}></div>
                  <div className={styles.strengthBar}></div>
                  <div className={styles.strengthBar}></div>
                </div>
                <p className={styles.strengthText}>Fair</p>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className={styles.confirmGroup}>
              <Input
                id="confirm-password"
                type="password"
                label="Confirm New Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth className={styles.submitButton}>
                <span>Set new password</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </Button>
            </div>
          </form>

          {/* Secondary Action */}
          <div className={styles.footer}>
            <Link to="/" className={styles.backLink}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              Back to log in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
