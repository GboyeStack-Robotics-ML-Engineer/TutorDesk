import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', contactInfo);
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <img src="/logo.png" alt="TutorDesk" className="mx-auto mb-2" style={{ height: '48px', objectFit: 'contain' }} />
          <h1 className="text-display-md text-primary">TutorDesk</h1>
        </div>

        {/* Forgot Password Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className="text-title-lg text-on-surface mb-2">Reset Password</h2>
            <p className={styles.subtitle}>
              Enter your email address or phone number, and we'll send you a link to get back into your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              id="contact_info"
              label="Email or Phone Number"
              placeholder="e.g. name@example.com"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />

            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth>
                Send reset link
              </Button>
            </div>
          </form>

          {/* Secondary Action */}
          <div className={styles.footer}>
            <Link to="/" className={styles.backLink}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
