import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';
import { useParentStudents } from '../../lib/useParentStudents';
import { ParentStudentSwitcher } from '../../components/ParentStudentSwitcher';

function formatWhen(startsAt) {
  const date = new Date(startsAt);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (isToday) return `Today, ${time}`;
  return `${date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}, ${time}`;
}

export const ParentPortalHome = () => {
  const { students, studentId, setStudentId, studentsError, loadingStudents } = useParentStudents();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    api.parent
      .dashboard({ studentId })
      .then((data) => {
        if (!cancelled) setDashboard(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your dashboard — the backend isn't reachable yet."
            : err.message || "Couldn't load your dashboard."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  if (loadingStudents || loading) {
    return <p className="font-body text-body text-ink-500" data-live-page="parent-portal-home">Loading…</p>;
  }

  if (studentsError || error) {
    return (
      <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-4" data-live-page="parent-portal-home">
        {studentsError || error}
      </p>
    );
  }

  if (!students.length) {
    return (
      <div data-live-page="parent-portal-home" className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 text-center">
        <p className="font-body text-body text-ink-700">No students are linked to your account yet.</p>
      </div>
    );
  }

  return (
    <div data-live-page="parent-portal-home">
      <ParentStudentSwitcher students={students} studentId={studentId} onChange={setStudentId} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 md:gap-space-6">

        <section className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-space-4">
              <h2 className="font-title-lg text-title-lg text-primary">Next Session</h2>
            </div>
            {dashboard?.nextClass ? (
              <div className="mb-space-6">
                <h3 className="font-title-md text-title-md text-on-surface mb-space-2">{dashboard.nextClass.subject}</h3>
                <div className="flex flex-col gap-space-2 text-ink-700 font-body-lg text-body-lg">
                  <div className="flex items-center gap-space-2">
                    <span className="material-symbols-outlined text-ink-500">calendar_today</span>
                    {formatWhen(dashboard.nextClass.startsAt)}
                  </div>
                </div>
              </div>
            ) : (
              <p className="font-body text-body text-ink-500 mb-space-6">No upcoming session scheduled.</p>
            )}
          </div>
          {dashboard?.nextClass && (
            <div className="flex gap-space-4 mt-auto">
              {dashboard.nextClass.meetLink ? (
                <a href={dashboard.nextClass.meetLink} target="_blank" rel="noreferrer"
                  className="flex-1 text-center bg-warning-solid text-on-primary py-space-3 rounded-DEFAULT font-title-sm text-title-sm hover:bg-opacity-90 transition-opacity">
                  Join Class Now
                </a>
              ) : (
                <p className="font-caption text-caption text-ink-500">No meeting link on this session yet.</p>
              )}
            </div>
          )}
        </section>

        <section className="md:col-span-4 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-space-2 mb-space-4 text-ink-500">
              <span className="material-symbols-outlined">payments</span>
              <h2 className="font-label text-label uppercase tracking-wider">Current Balance</h2>
            </div>
            <div className="mb-space-6">
              <div className={`font-display-md text-display-md font-bold mb-space-1 ${Number(dashboard?.balance) > 0 ? 'text-danger-solid' : 'text-success-solid'}`}>
                ₦ {Number(dashboard?.balance || 0).toLocaleString()}
              </div>
              {dashboard?.balanceDueDate && (
                <p className="font-body text-body text-ink-500">
                  Due by {new Date(dashboard.balanceDueDate).toLocaleDateString([], { month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
          </div>
          <Link to="/parent/payments-invoices"
            className="w-full text-center bg-primary text-on-primary py-space-2 rounded-DEFAULT font-label text-label hover:bg-primary-container transition-colors">
            View Invoices
          </Link>
        </section>

        <section className="md:col-span-12 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)]">
          <div className="flex justify-between items-center mb-space-6">
            <div className="flex items-center gap-space-2">
              <span className="material-symbols-outlined text-primary">assessment</span>
              <h2 className="font-title-lg text-title-lg text-on-surface">This Month</h2>
            </div>
            <Link to="/parent/progress-reports" className="text-primary hover:text-primary-container font-label text-label flex items-center gap-space-1">
              View Full Report
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">
            <div className="p-space-4 bg-surface-container-lowest border border-paper-200 rounded-DEFAULT">
              <div className="font-label text-label text-ink-500 mb-space-2">Attendance</div>
              <div className="font-title-lg text-title-lg text-success-solid mb-space-1">
                {dashboard?.thisMonth?.attendancePercent != null ? `${dashboard.thisMonth.attendancePercent}%` : '—'}
              </div>
              <div className="font-caption text-caption text-ink-500">
                {dashboard?.thisMonth?.sessionsCompleted || 0} session(s) completed this month
              </div>
            </div>
            <div className="p-space-4 bg-surface-container-low rounded-DEFAULT md:col-span-2">
              <div className="font-label text-label text-ink-700 mb-space-2 flex items-center gap-space-1">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Tutor's Note
              </div>
              {dashboard?.recentNote ? (
                <p className="font-body-lg text-body-lg text-ink-900 line-clamp-3 italic">
                  "{dashboard.recentNote.text}" — {dashboard.recentNote.tutorName}
                </p>
              ) : (
                <p className="font-body text-body text-ink-500">No notes yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
