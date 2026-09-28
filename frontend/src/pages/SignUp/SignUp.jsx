import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './SignUp.module.css';

export const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/portal/view/branding-settings');
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {/* Brand Wordmark */}
        <div className={styles.brandHeader}>
          <h1 className="text-display-md text-primary">TutorDesk</h1>
          <p className={styles.subtitle}>Independent Operations</p>
        </div>

        {/* Sign Up Card */}
        <div className={styles.card}>
          <h2 className="text-title-lg text-on-surface mb-2 text-center">Create account</h2>
          <p className={styles.cardSubtitle}>Start managing your classes today.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <Input
              id="fullName"
              label="Full Name"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            {/* Email Address */}
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Phone Number */}
            <div className={styles.phoneGroup}>
              <label htmlFor="phone" className={styles.label}>Phone Number</label>
              <div className={styles.phoneInputWrapper}>
                <span className={styles.phonePrefix}>+234</span>
                <input
                  id="phone"
                  type="tel"
                  className={styles.phoneInput}
                  placeholder="801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.passwordGroup}>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.passwordInputSpacing}
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
              <p className={styles.passwordHint}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
                Must be at least 8 characters.
              </p>
            </div>

            {/* Submit Button */}
            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth>
                Create account
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <Link to="/" className={styles.footerLink}>
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer / Legal */}
        <p className={styles.legalText}>
          By creating an account, you agree to our <a href="#" className={styles.legalLink}>Terms of Service</a> and <a href="#" className={styles.legalLink}>Privacy Policy</a>.
        </p>
      </main>
    </div>
  );
};
