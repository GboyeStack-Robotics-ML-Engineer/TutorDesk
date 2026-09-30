import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Post-class wrap-up — wired to POST /api/classes/{id}/complete/. A
// homework due date becomes a real Google Task when the tutor has
// Calendar/Tasks connected (see core/services/google.py). The "Send
// Update to Parent" toggle and homework-attachment picker from the
// original static mockup aren't wired — no tutor-initiated WhatsApp send
// or file storage exists yet (see docs/PRD.md Section E), so they're
// dropped rather than left as decoration that implies they work.

export const ClassroomPostClassWrap = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [attendance, setAttendance] = useState('present');
  const [notes, setNotes] = useState('');
  const [homeworkDueAt, setHomeworkDueAt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoadError('No class selected.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    api.classes
      .get(id)
      .then((found) => {
        if (!cancelled) setSession(found);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load this class.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const handleClose = () => navigate(-1);

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitting(true);
    try {
      await api.classes.complete(id, { attendance, notes, homeworkDueAt: homeworkDueAt || undefined });
      navigate('/portal/schedule');
    } catch (err) {
      setSubmitError(err instanceof NetworkError ? err.message : err.message || 'Could not save this wrap-up.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-live-page="classroom-post-class-wrap" className="flex flex-col">
      {loading && <p className="font-caption text-caption text-ink-500 p-space-6">Loading…</p>}
      {loadError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint m-space-6 rounded-lg p-3">
          {loadError}
        </p>
      )}

      {session && (
        <>
          <div className="px-space-6 py-space-6 flex flex-col gap-space-8 overflow-y-auto">
            <h2 className="font-title-md text-title-md text-on-surface">{session.subject} with {session.studentName}</h2>

            <section className="flex flex-col gap-space-3">
              <h2 className="font-label text-label text-ink-700">Attendance Status</h2>
              <div className="flex flex-col sm:flex-row gap-space-3">
                {[
                  { value: 'present', label: 'Present', icon: 'check_circle' },
                  { value: 'absent', label: 'Absent', icon: 'cancel' },
                  { value: 'late', label: 'Late', icon: 'schedule' },
                ].map((opt) => (
                  <label key={opt.value} className="flex-1 relative cursor-pointer group">
                    <input
                      className="peer sr-only" name="attendance" type="radio" value={opt.value}
                      checked={attendance === opt.value} onChange={() => setAttendance(opt.value)}
                    />
                    <div className={`w-full py-space-3 px-space-4 border rounded-lg flex items-center justify-center gap-space-2 transition-all duration-200 ${attendance === opt.value ? 'border-primary bg-primary-container text-on-primary-container' : 'border-paper-300 bg-paper-0 text-on-surface hover:bg-paper-100'}`}>
                      <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                      {opt.label}
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-space-3">
              <label className="font-label text-label text-ink-700" htmlFor="session-notes">Session Feedback &amp; Notes</label>
              <textarea
                id="session-notes" value={notes} onChange={(e) => setNotes(e.target.value)}
                className="w-full min-h-[140px] bg-paper-0 border border-paper-300 rounded-lg p-space-4 font-body text-body text-on-surface placeholder:text-ink-500 focus:outline-none focus:border-primary resize-y"
                placeholder="Summarize the topics covered, student's performance, and areas for improvement..."
              />
            </section>

            <section className="flex flex-col gap-space-3">
              <label className="font-label text-label text-ink-700" htmlFor="homework-due">Homework Due Date (optional)</label>
              <div className="relative max-w-xs">
                <span className="material-symbols-outlined text-ink-500 text-[20px] absolute left-3 top-1/2 -translate-y-1/2">event</span>
                <input
                  id="homework-due" type="date" value={homeworkDueAt} onChange={(e) => setHomeworkDueAt(e.target.value)}
                  className="w-full border border-paper-300 rounded-lg pl-11 pr-4 py-space-3 font-body text-body text-on-surface bg-paper-0 focus:outline-none focus:border-primary"
                />
              </div>
              <p className="font-caption text-caption text-ink-500">
                Adds a Google Task reminder if you've connected Google Calendar (Settings → Data &amp; Sync).
              </p>
            </section>

            {submitError && (
              <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
                {submitError}
              </p>
            )}
          </div>

          <footer className="px-space-6 py-space-4 border-t border-paper-200 bg-surface flex items-center justify-between rounded-b-xl">
            <button onClick={handleClose} disabled={submitting}
              className="px-space-3 py-space-2 font-label text-label text-ink-700 hover:text-on-surface hover:bg-paper-200 rounded-md transition-colors flex items-center gap-2 disabled:opacity-60">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting}
              className="px-space-6 py-2.5 bg-warning-solid text-paper-0 font-label text-label rounded-lg flex items-center gap-2 hover:bg-secondary transition-all shadow-sm disabled:opacity-60">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
              {submitting ? 'Saving…' : 'Finish & Close'}
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
