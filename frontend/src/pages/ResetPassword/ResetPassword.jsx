import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { api, NetworkError } from '../../lib/api';
import styles from './ResetPassword.module.css';

// Real strength heuristic (length + character variety) rather than a
// fixed "Fair" — cheap to compute honestly, so there's no reason to fake it.
function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] };
}

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = passwordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('This reset link is missing its token — please use the link from your email.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.auth.confirmPasswordReset({ token, password: newPassword });
      navigate('/login', { replace: true, state: { passwordReset: true } });
    } catch (err) {
      setError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not reset your password. The link may have expired — request a new one.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
              {newPassword && (
                <div className={styles.strengthMeterContainer}>
                  <div className={styles.strengthBars}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`${styles.strengthBar} ${i < strength.score ? styles.strengthActive : ''}`}></div>
                    ))}
                  </div>
                  <p className={styles.strengthText}>{strength.label}</p>
                </div>
              )}
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

            {error && (
              <p role="alert" className={styles.formError}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth className={styles.submitButton} disabled={isSubmitting}>
                <span>{isSubmitting ? 'Saving…' : 'Set new password'}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </Button>
            </div>
          </form>

          {/* Secondary Action */}
          <div className={styles.footer}>
            <Link to="/login" className={styles.backLink}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              Back to log in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
