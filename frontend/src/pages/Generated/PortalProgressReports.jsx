import React, { useState, useEffect } from 'react';
import { api, API_BASE_URL, NetworkError } from '../../lib/api';
import { useParentStudents } from '../../lib/useParentStudents';
import { ParentStudentSwitcher } from '../../components/ParentStudentSwitcher';

export const PortalProgressReports = () => {
  const { students, studentId, setStudentId, studentsError, loadingStudents } = useParentStudents();
  const [progress, setProgress] = useState(null);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    Promise.all([api.parent.progress({ studentId }), api.parent.reports({ studentId })])
      .then(([progressData, reportsData]) => {
        if (cancelled) return;
        setProgress(progressData);
        setReports(reportsData.reports || []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load progress data — the backend isn't reachable yet."
            : err.message || "Couldn't load progress data."
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
    return <p className="font-body text-body text-ink-500" data-live-page="progress-reports">Loading…</p>;
  }

  if (studentsError || error) {
    return (
      <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-4" data-live-page="progress-reports">
        {studentsError || error}
      </p>
    );
  }

  if (!students.length) {
    return (
      <div data-live-page="progress-reports" className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 text-center">
        <p className="font-body text-body text-ink-700">No students are linked to your account yet.</p>
      </div>
    );
  }

  const maxTrend = Math.max(1, ...(progress?.monthlyTrend || []).map((m) => m.attendancePercent || 0));

  return (
    <div data-live-page="progress-reports">
      <ParentStudentSwitcher students={students} studentId={studentId} onChange={setStudentId} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 md:gap-space-6">

        <div className="md:col-span-4 flex flex-col gap-space-4 md:gap-space-6">
          <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5">
            <div className="flex justify-between items-start mb-space-4">
              <span className="font-label text-label text-ink-500 uppercase tracking-wider">Attendance (this month)</span>
              <div className="bg-success-tint text-success-solid p-2 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] fill">check_circle</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-2">
              <span className="font-display-lg text-display-lg text-on-background">
                {progress?.attendancePercent != null ? `${progress.attendancePercent}%` : '—'}
              </span>
            </div>
            <p className="font-caption text-caption text-ink-500 mt-space-2 text-right">
              {progress?.sessionsCompleted || 0} session(s) completed
            </p>
          </div>

          <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5">
            <div className="flex items-center gap-space-2 mb-space-4 text-ink-700">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
              <span className="font-label text-label uppercase tracking-wider">Tutor's Note</span>
            </div>
            {progress?.recentNote ? (
              <>
                <p className="font-body text-body text-on-background italic">"{progress.recentNote.text}"</p>
                <p className="font-caption text-caption text-ink-500 mt-space-2">
                  — {progress.recentNote.tutorName}, {new Date(progress.recentNote.at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </p>
              </>
            ) : (
              <p className="font-body text-body text-ink-500">No notes yet.</p>
            )}
          </div>
        </div>

        <div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5">
          <h2 className="font-title-md text-title-md text-on-background mb-space-6">Attendance — Last 6 Months</h2>
          {progress?.monthlyTrend?.some((m) => m.sessionsCompleted > 0) ? (
            <div className="flex items-end justify-between gap-space-3 h-40">
              {progress.monthlyTrend.map((m) => (
                <div key={m.period} className="flex-1 flex flex-col items-center gap-space-2">
                  <span className="font-caption text-caption text-ink-500">
                    {m.attendancePercent != null ? `${m.attendancePercent}%` : '—'}
                  </span>
                  <div className="w-full bg-surface-variant rounded-t-DEFAULT flex items-end" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-primary rounded-t-DEFAULT transition-all"
                      style={{ height: `${((m.attendancePercent || 0) / maxTrend) * 100}%` }}
                    />
                  </div>
                  <span className="font-caption text-caption text-ink-500">{m.label.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-body text-ink-500">No completed sessions in the last 6 months yet.</p>
          )}
        </div>

        <div className="md:col-span-12 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5">
          <h2 className="font-title-md text-title-md text-on-background mb-space-4">Monthly Reports</h2>
          {reports?.length ? (
            <ul className="flex flex-col gap-space-3">
              {reports.map((r) => (
                <li key={r.period} className="flex items-center justify-between p-3 rounded-lg border border-paper-200 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-space-3">
                    <div className="bg-surface-variant text-ink-700 p-2 rounded-md">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </div>
                    <p className="font-title-sm text-title-sm text-on-background">{r.label}</p>
                  </div>
                  <a
                    href={`${API_BASE_URL}${r.downloadUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Download ${r.label} report`}
                    className="text-ink-500 group-hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">download</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-body text-ink-500">No reports available yet — one is generated each month once classes have run.</p>
          )}
        </div>
      </div>
    </div>
  );
};
