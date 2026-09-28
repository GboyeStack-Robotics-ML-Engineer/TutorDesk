import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, NetworkError } from '../../../lib/api';
import styles from './MySchedule.module.css';

// Shape assumed from ClassSession (see docs/PRD.md / lib/api.js) until the
// backend contract is finalized: { id, subject, studentName, startsAt,
// durationMinutes, status: 'scheduled'|'completed'|'cancelled', platform }.

function formatWhen(startsAt) {
  const date = new Date(startsAt);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (isToday) return `Today, ${time}`;
  if (isTomorrow) return `Tomorrow, ${time}`;
  return `${date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} • ${time}`;
}

const STATUS_BADGE = {
  scheduled: { label: 'Scheduled', className: 'scheduledBadge' },
  completed: { label: 'Completed', className: 'completedBadge' },
  cancelled: { label: 'Cancelled', className: 'cancelledBadge' },
};

export const MySchedule = () => {
  const [classes, setClasses] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.classes
      .list()
      .then((list) => {
        if (!cancelled) setClasses(list || []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your schedule — the backend isn't reachable yet."
            : err.message || "Couldn't load your schedule."
        );
        setClasses([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const now = new Date();
  const upcoming = (classes || [])
    .filter((c) => c.status !== 'cancelled' && c.status !== 'completed' && new Date(c.startsAt) >= now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  const past = (classes || [])
    .filter((c) => c.status === 'cancelled' || c.status === 'completed' || new Date(c.startsAt) < now)
    .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt));

  const isLoading = classes === null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-display-lg text-on-surface">My Classes</h1>
        <p className="text-body-lg text-ink-500">Your upcoming schedule and past sessions.</p>
      </header>

      {error && (
        <p role="alert" className="text-body text-danger-solid bg-danger-tint rounded-lg p-4 mb-4">
          {error}
        </p>
      )}

      <div className={styles.grid}>
        {/* Left Column: Agenda View */}
        <div className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <h2 className="text-title-md text-on-surface">Upcoming</h2>
          </div>

          {isLoading && <p className="text-body text-ink-500">Loading your schedule…</p>}

          {!isLoading && upcoming.length === 0 && (
            <p className="text-body text-ink-500">
              No upcoming classes yet.{' '}
              <Link to="/portal/view/create-edit-class-desktop" className="text-primary">
                Schedule one
              </Link>
              .
            </p>
          )}

          {upcoming.map((session, i) => (
            <article
              key={session.id}
              className={`${styles.card} ${i === 0 ? styles.activeCard : styles.hoverCard}`}
            >
              {i === 0 && <div className={styles.activeIndicator}></div>}
              <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                  <div className={styles.badgeRow}>
                    <span className={styles.scheduledBadge}>Scheduled</span>
                    <span className={styles.timeLabel}>{formatWhen(session.startsAt)}</span>
                  </div>
                  <h3 className="text-title-lg text-on-surface">{session.subject || 'Session'}</h3>
                  {session.studentName && (
                    <div className={styles.tutorInfo}>
                      <span className="material-symbols-outlined text-[14px]">school</span>
                      <span>{session.studentName}</span>
                    </div>
                  )}
                </div>
                {i === 0 && (
                  <div className={styles.cardAction}>
                    <button className={styles.joinButton}>
                      <span className="material-symbols-outlined text-[18px]">videocam</span>
                      Join Session
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}

          {/* Past Sessions Section */}
          <div className={`${styles.sectionHeader} ${styles.marginTop}`}>
            <h2 className="text-title-md text-on-surface">Past Sessions</h2>
          </div>

          {!isLoading && past.length === 0 && (
            <p className="text-body text-ink-500">No past sessions yet.</p>
          )}

          {past.map((session) => {
            const badge = STATUS_BADGE[session.status] || STATUS_BADGE.completed;
            return (
              <article
                key={session.id}
                className={`${styles.card} ${session.status === 'cancelled' ? styles.cancelledCard : styles.pastCard}`}
              >
                <div className={styles.cardInfo}>
                  <div className={styles.badgeRow}>
                    <span className={styles[badge.className]}>{badge.label}</span>
                    <span className={`${styles.timeLabel} ${session.status === 'cancelled' ? styles.strikethrough : ''}`}>
                      {formatWhen(session.startsAt)}
                    </span>
                  </div>
                  <h3 className="text-body-lg font-medium text-on-surface">{session.subject || 'Session'}</h3>
                  {session.studentName && <p className="text-body text-ink-500">{session.studentName}</p>}
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Column: placeholder until reports/messages APIs exist */}
        <aside className={styles.sideColumn}>
          <div className={styles.widgetCard}>
            <h4 className="text-title-sm text-on-surface mb-4">This Month's Progress</h4>
            <p className="text-body text-ink-500">Coming soon — once session and attendance data is tracked server-side.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
