import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Reschedule or cancel a class — wired to PATCH /api/classes/{id}/ and
// POST /api/classes/{id}/cancel/. Both push to the tutor's Google Calendar
// when connected (see core/services/google.py) — that's real; the
// "Notify via WhatsApp" checkbox on the cancel tab is not (no
// tutor-initiated WhatsApp send exists yet outside onboarding — see
// docs/PRD.md Section E), so it's left present but inert rather than
// faking a send.

const CANCEL_REASONS = [
  { value: 'illness', label: 'Illness / Medical Emergency' },
  { value: 'scheduling', label: 'Scheduling Conflict' },
  { value: 'technical', label: 'Technical Difficulties Expected' },
  { value: 'other', label: 'Other (Please specify below)' },
];

export const RescheduleCancelClassDesktop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [tab, setTab] = useState('reschedule');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelDetails, setCancelDetails] = useState('');

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
        if (cancelled) return;
        setSession(found);
        const d = new Date(found.startsAt);
        setNewDate(d.toISOString().slice(0, 10));
        setNewTime(d.toTimeString().slice(0, 5));
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load this class.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const handleClose = () => navigate(-1);

  const handleReschedule = async () => {
    setSubmitError('');
    if (!newDate || !newTime) {
      setSubmitError('Choose a new date and time.');
      return;
    }
    setSubmitting(true);
    try {
      const startsAt = new Date(`${newDate}T${newTime}`).toISOString();
      await api.classes.reschedule(id, { startsAt, notes: rescheduleReason ? `Rescheduled: ${rescheduleReason}` : undefined });
      navigate('/portal/schedule');
    } catch (err) {
      setSubmitError(err instanceof NetworkError ? err.message : err.message || 'Could not reschedule this class.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setSubmitError('');
    if (!cancelReason) {
      setSubmitError('Choose a reason for cancellation.');
      return;
    }
    setSubmitting(true);
    try {
      const label = CANCEL_REASONS.find((r) => r.value === cancelReason)?.label || cancelReason;
      const reason = cancelDetails ? `${label} — ${cancelDetails}` : label;
      await api.classes.cancel(id, { reason });
      navigate('/portal/schedule');
    } catch (err) {
      setSubmitError(err instanceof NetworkError ? err.message : err.message || 'Could not cancel this class.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-live-page="reschedule-cancel-class" className="fixed inset-0 modal-backdrop-pattern flex items-center justify-center z-50 p-gutter-mobile md:p-gutter-desktop backdrop-blur-sm">
      <div aria-labelledby="modal-title" aria-modal="true" className="bg-paper-0 border border-paper-200 rounded-xl w-full max-w-2xl modal-shadow flex flex-col max-h-[921px] overflow-hidden" role="dialog">

        <div className="px-space-6 py-space-4 border-b border-paper-200 flex justify-between items-start bg-surface sticky top-0 z-10">
          <div>
            <h2 className="font-title-md text-title-md text-on-surface mb-1" id="modal-title">Manage Class Session</h2>
            {session && (
              <p className="font-body text-body text-on-surface-variant">{session.subject} with {session.studentName}</p>
            )}
          </div>
          <button onClick={handleClose} aria-label="Close modal" className="text-on-surface-variant hover:text-ink-900 transition-colors p-1 rounded-md hover:bg-paper-100">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {loading && <p className="font-caption text-caption text-ink-500 p-space-6">Loading…</p>}
        {loadError && (
          <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint m-space-6 rounded-lg p-3">
            {loadError}
          </p>
        )}

        {session && (
          <>
            <div className="px-space-6 border-b border-paper-200 bg-surface flex gap-space-4">
              <button
                className={`font-title-sm text-title-sm py-3 px-2 transition-colors ${tab === 'reschedule' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
                onClick={() => setTab('reschedule')}
              >
                Reschedule
              </button>
              <button
                className={`font-title-sm text-title-sm py-3 px-2 transition-colors ${tab === 'cancel' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
                onClick={() => setTab('cancel')}
              >
                Cancel Class
              </button>
            </div>

            <div className="p-space-6 overflow-y-auto custom-scrollbar flex-grow">
              <div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 mb-space-6 flex gap-space-4 items-center">
                <div className="bg-paper-0 border border-paper-200 rounded-md w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
                </div>
                <div>
                  <p className="font-label text-label text-on-surface-variant uppercase tracking-wider mb-0.5">Current Schedule</p>
                  <p className="font-title-sm text-title-sm text-on-surface">
                    {new Date(session.startsAt).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {tab === 'reschedule' ? (
                <div className="space-y-space-6">
                  <div className="space-y-space-4">
                    <h3 className="font-title-sm text-title-sm text-on-surface">Select New Date &amp; Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
                      <div className="space-y-1">
                        <label className="font-label text-label text-on-surface-variant block" htmlFor="new-date">Date</label>
                        <input id="new-date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                          className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label text-label text-on-surface-variant block" htmlFor="new-time">Time</label>
                        <input id="new-time" type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)}
                          className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label text-label text-on-surface-variant block" htmlFor="reschedule-reason">Reason for rescheduling (Optional)</label>
                    <textarea id="reschedule-reason" rows={2} value={rescheduleReason} onChange={(e) => setRescheduleReason(e.target.value)}
                      placeholder="Briefly explain why you need to move the class..."
                      className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary resize-none" />
                  </div>
                </div>
              ) : (
                <div className="space-y-space-6">
                  <div className="bg-danger-tint border border-[#E5C1B9] rounded-lg p-space-4 flex gap-space-3 items-start">
                    <span className="material-symbols-outlined text-danger-solid text-[24px] flex-shrink-0">warning</span>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-ink-900 mb-1">Before you cancel</h4>
                      <p className="font-body text-body text-ink-700">The student's parent isn't automatically notified yet — let them know directly.</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label text-label text-on-surface-variant block" htmlFor="cancel-reason">
                      Reason for cancellation <span className="text-danger-solid">*</span>
                    </label>
                    <select id="cancel-reason" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary appearance-none">
                      <option value="">Select a reason...</option>
                      {CANCEL_REASONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <textarea rows={2} value={cancelDetails} onChange={(e) => setCancelDetails(e.target.value)}
                      placeholder="Additional details..."
                      className="w-full mt-2 bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary resize-none" />
                  </div>
                </div>
              )}

              {submitError && (
                <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3 mt-space-4">
                  {submitError}
                </p>
              )}
            </div>

            <div className="px-space-6 py-space-4 border-t border-paper-200 bg-surface flex justify-end gap-space-3 sticky bottom-0 z-10">
              <button onClick={handleClose} disabled={submitting}
                className="px-4 py-2 rounded-md font-label text-label font-bold text-on-surface-variant bg-paper-0 border border-paper-300 hover:bg-paper-100 transition-colors disabled:opacity-60">
                Keep Class
              </button>
              <button
                onClick={tab === 'reschedule' ? handleReschedule : handleCancel}
                disabled={submitting}
                className="px-4 py-2 rounded-md font-label text-label font-bold text-on-primary bg-primary hover:bg-surface-tint transition-colors shadow-sm disabled:opacity-60"
              >
                {submitting ? 'Saving…' : tab === 'reschedule' ? 'Confirm Reschedule' : 'Confirm Cancellation'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
