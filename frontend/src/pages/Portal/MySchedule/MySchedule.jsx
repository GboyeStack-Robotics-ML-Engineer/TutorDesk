import React from 'react';
import { Button } from '../../../components/ui/Button/Button';
import styles from './MySchedule.module.css';

export const MySchedule = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-display-lg text-on-surface">My Classes</h1>
        <p className="text-body-lg text-ink-500">Your upcoming schedule and past sessions.</p>
      </header>

      <div className={styles.grid}>
        {/* Left Column: Agenda View */}
        <div className={styles.mainColumn}>
          {/* Upcoming Section */}
          <div className={styles.sectionHeader}>
            <h2 className="text-title-md text-on-surface">Upcoming</h2>
            <span className={styles.sectionLabel}>Today</span>
          </div>

          {/* Active/Next Class Card */}
          <article className={`${styles.card} ${styles.activeCard}`}>
            <div className={styles.activeIndicator}></div>
            <div className={styles.cardContent}>
              <div className={styles.cardInfo}>
                <div className={styles.badgeRow}>
                  <span className={styles.pulseBadge}>
                    <span className={styles.pulseDot}></span>
                    Starting Soon
                  </span>
                  <span className={styles.timeLabel}>10:00 AM - 11:30 AM (Local)</span>
                </div>
                <h3 className="text-title-lg text-on-surface">Advanced Calculus</h3>
                <div className={styles.tutorInfo}>
                  <span className="material-symbols-outlined text-[14px]">school</span>
                  <span>Dr. Amina Yusuf Academy</span>
                </div>
              </div>
              <div className={styles.cardAction}>
                <button className={styles.joinButton}>
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                  Join Session
                </button>
              </div>
            </div>
          </article>

          {/* Future Scheduled Class */}
          <article className={`${styles.card} ${styles.hoverCard}`}>
            <div className={styles.cardInfo}>
              <div className={styles.badgeRow}>
                <span className={styles.scheduledBadge}>Scheduled</span>
                <span className={styles.timeLabel}>Tomorrow, 2:00 PM</span>
              </div>
              <h3 className="text-title-md text-on-surface">Physics: Thermodynamics</h3>
              <p className="text-body text-ink-500">Dr. Amina Yusuf Academy</p>
            </div>
          </article>

          {/* Past Sessions Section */}
          <div className={`${styles.sectionHeader} ${styles.marginTop}`}>
            <h2 className="text-title-md text-on-surface">Past Sessions</h2>
            <span className={styles.sectionLabel}>This Week</span>
          </div>

          {/* Past Class (Completed) */}
          <article className={`${styles.card} ${styles.pastCard}`}>
            <div className={styles.cardInfo}>
              <div className={styles.badgeRow}>
                <span className={styles.completedBadge}>Completed</span>
                <span className={styles.timeLabel}>Mon, Oct 24 • 10:00 AM</span>
              </div>
              <h3 className="text-body-lg font-medium text-on-surface">Introduction to Limits</h3>
              <p className="text-body text-ink-500">Dr. Amina Yusuf Academy</p>
            </div>
            <div className={styles.cardAction}>
              <button className={styles.textButton}>Review Notes</button>
            </div>
          </article>

          {/* Past Class (Cancelled) */}
          <article className={`${styles.card} ${styles.cancelledCard}`}>
            <div className={styles.cardInfo}>
              <div className={styles.badgeRow}>
                <span className={styles.cancelledBadge}>Cancelled</span>
                <span className={`${styles.timeLabel} ${styles.strikethrough}`}>Fri, Oct 20 • 3:00 PM</span>
              </div>
              <h3 className="text-body-lg font-medium text-ink-700">Chemistry Lab Prep</h3>
              <p className="text-body text-ink-500">Dr. Amina Yusuf Academy</p>
            </div>
          </article>
        </div>

        {/* Right Column: Stats and Updates */}
        <aside className={styles.sideColumn}>
          {/* Progress Stats */}
          <div className={styles.widgetCard}>
            <h4 className="text-title-sm text-on-surface mb-4">This Month's Progress</h4>
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Hours</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>8</span>
                <span className={styles.statLabel}>Classes</span>
              </div>
            </div>
          </div>

          {/* Updates Widget */}
          <div className={styles.widgetCardImage}>
            <div className={styles.imageHeader}>
              <div className={styles.imageOverlay}>
                <h4 className="text-title-sm text-paper-0">Tutor Updates</h4>
              </div>
            </div>
            <div className={styles.widgetContent}>
              <p className="text-body text-ink-700 mb-2">
                "Please review the attached worksheet before our next Calculus session." - Dr. Yusuf
              </p>
              <a href="#" className={styles.viewLink}>
                View Attachment <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
