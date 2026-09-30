import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

const SUBJECT_OPTIONS = [
  { value: 'math', label: 'Advanced Mathematics' },
  { value: 'physics', label: 'Physics 101' },
  { value: 'literature', label: 'English Literature' },
];

export const CreateEditClassDesktop = () => {
  const [students, setStudents] = useState([]);
  const [studentsError, setStudentsError] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [recurrence, setRecurrence] = useState('none');
  const [platform, setPlatform] = useState('tutordesk');
  const [notes, setNotes] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [googleConnected, setGoogleConnected] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    api.students
      .list({ pageSize: 200 })
      .then((data) => {
        if (!cancelled) setStudents(data?.results || []);
      })
      .catch((err) => {
        if (cancelled) return;
        setStudentsError(
          err instanceof NetworkError
            ? "Couldn't load your students — the backend isn't reachable yet."
            : err.message || "Couldn't load your students."
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingStudents(false);
      });
    api.google
      .status()
      .then((s) => {
        if (!cancelled) setGoogleConnected(s.connected);
      })
      .catch(() => {
        if (!cancelled) setGoogleConnected(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCancel = () => navigate(-1);

  const validate = () => {
    const next = {};
    if (!studentId) next.studentId = 'Choose a student.';
    if (!subject) next.subject = 'Choose a subject.';
    if (!date) next.date = 'Choose a date.';
    if (!startTime) next.startTime = 'Choose a start time.';
    if (platform === 'external' && !meetLink.trim()) next.meetLink = 'Paste your meeting link.';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const startsAt = new Date(`${date}T${startTime}`).toISOString();
      await api.classes.create({
        studentId,
        subject,
        startsAt,
        durationMinutes: Number(durationMinutes),
        recurrence,
        platform,
        notes,
        meetLink: platform === 'external' ? meetLink.trim() : undefined,
      });
      navigate('/portal/schedule');
    } catch (err) {
      setSubmitError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not schedule this session. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-live-page="create-edit-class">
      <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-40 transition-opacity"></div>

      <div className="relative bg-paper-0 rounded-xl w-full max-w-3xl max-h-[921px] flex flex-col z-50 border border-paper-200 shadow-[0_8px_32px_-4px_rgba(22,33,30,0.08)] overflow-hidden mx-auto">

        <div className="flex items-center justify-between px-space-6 py-space-4 border-b border-paper-200 bg-surface">
          <h2 className="font-title-lg text-title-lg text-ink-900">Schedule Session</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-ink-500 hover:text-ink-900 transition-colors p-1 rounded-full hover:bg-paper-100"
            aria-label="Close"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-space-6 bg-paper-0">
          <form className="space-y-space-6" onSubmit={handleSubmit} noValidate>

            {studentsError && (
              <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
                {studentsError}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

              <div className="space-y-space-1">
                <label className="block font-label text-label text-ink-700" htmlFor="student">Student</label>
                <select
                  id="student"
                  className="w-full px-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body appearance-none disabled:opacity-60"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled={isSubmitting || loadingStudents}
                >
                  <option value="">{loadingStudents ? 'Loading students…' : 'Select a student'}</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {fieldErrors.studentId && <p className="font-caption text-caption text-danger-solid">{fieldErrors.studentId}</p>}
              </div>

              <div className="space-y-space-1">
                <label className="block font-label text-label text-ink-700" htmlFor="subject">Subject</label>
                <div className="relative">
                  <select
                    id="subject"
                    className="w-full pl-3 pr-10 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body appearance-none"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="">Select subject</option>
                    {SUBJECT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" data-icon="arrow_drop_down">arrow_drop_down</span>
                </div>
                {fieldErrors.subject && <p className="font-caption text-caption text-danger-solid">{fieldErrors.subject}</p>}
              </div>
            </div>
            <hr className="border-t border-paper-200" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
              <div className="space-y-space-1">
                <label className="block font-label text-label text-ink-700" htmlFor="date">Date</label>
                <input
                  className="w-full pl-3 pr-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-data-display text-data-display"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isSubmitting}
                />
                {fieldErrors.date && <p className="font-caption text-caption text-danger-solid">{fieldErrors.date}</p>}
              </div>
              <div className="space-y-space-1">
                <label className="block font-label text-label text-ink-700" htmlFor="start_time">Start Time</label>
                <input
                  className="w-full pl-3 pr-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-data-display text-data-display"
                  id="start_time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={isSubmitting}
                />
                {fieldErrors.startTime && <p className="font-caption text-caption text-danger-solid">{fieldErrors.startTime}</p>}
              </div>
              <div className="space-y-space-1">
                <label className="block font-label text-label text-ink-700" htmlFor="duration">Duration</label>
                <select
                  className="w-full pl-3 pr-10 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body appearance-none"
                  id="duration"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
            <hr className="border-t border-paper-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

              <div className="space-y-space-2 bg-surface-container-low p-space-4 rounded-lg border border-paper-200">
                <label className="flex items-center gap-2 font-title-sm text-title-sm text-ink-900">
                  <span className="material-symbols-outlined text-ink-700" data-icon="event_repeat">event_repeat</span>
                  Recurrence
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="text-primary focus:ring-primary h-4 w-4 border-paper-300"
                      name="recurrence"
                      type="radio"
                      value="none"
                      checked={recurrence === 'none'}
                      onChange={(e) => setRecurrence(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <span className="font-body text-body text-ink-700">None</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="text-primary focus:ring-primary h-4 w-4 border-paper-300"
                      name="recurrence"
                      type="radio"
                      value="weekly"
                      checked={recurrence === 'weekly'}
                      onChange={(e) => setRecurrence(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <span className="font-body text-body text-ink-700">Weekly</span>
                  </label>
                </div>
              </div>

              <div className="space-y-space-2 bg-surface-container-low p-space-4 rounded-lg border border-paper-200">
                <label className="flex items-center gap-2 font-title-sm text-title-sm text-ink-900">
                  <span className="material-symbols-outlined text-ink-700" data-icon="video_camera_front">video_camera_front</span>
                  Platform
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="text-primary focus:ring-primary h-4 w-4 border-paper-300"
                      name="platform"
                      type="radio"
                      value="tutordesk"
                      checked={platform === 'tutordesk'}
                      onChange={(e) => setPlatform(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <span className="font-body text-body text-ink-700">TutorDesk Space</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="text-primary focus:ring-primary h-4 w-4 border-paper-300"
                      name="platform"
                      type="radio"
                      value="external"
                      checked={platform === 'external'}
                      onChange={(e) => setPlatform(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <span className="font-body text-body text-ink-700">External Link</span>
                  </label>
                </div>
                {platform === 'tutordesk' ? (
                  googleConnected ? (
                    <p className="font-caption text-caption text-ink-500">
                      A Google Meet link will be created automatically when you save.
                    </p>
                  ) : googleConnected === false ? (
                    <p className="font-caption text-caption text-ink-500">
                      Connect Google Calendar in{' '}
                      <a href="/portal/view/settings-data-sync-preferences" className="text-primary underline">
                        Settings
                      </a>{' '}
                      to auto-generate a Meet link — otherwise you'll need to add one after saving.
                    </p>
                  ) : null
                ) : (
                  <div className="space-y-space-1">
                    <label className="block font-label text-label text-ink-700" htmlFor="meet_link">Meeting link</label>
                    <input
                      className="w-full px-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body placeholder:text-ink-500"
                      id="meet_link"
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      value={meetLink}
                      onChange={(e) => setMeetLink(e.target.value)}
                      disabled={isSubmitting}
                    />
                    {fieldErrors.meetLink && <p className="font-caption text-caption text-danger-solid">{fieldErrors.meetLink}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-space-1">
              <label className="block font-label text-label text-ink-700" htmlFor="notes">Session Notes (Optional)</label>
              <textarea
                className="w-full px-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body placeholder:text-ink-500 resize-none"
                id="notes"
                placeholder="Topics to cover..."
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {submitError && (
              <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
                {submitError}
              </p>
            )}
          </form>
        </div>

        <div className="flex items-center justify-end gap-space-3 px-space-6 py-space-4 border-t border-paper-200 bg-surface">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-space-4 py-2 font-title-sm text-title-sm text-ink-700 bg-paper-0 border border-paper-300 rounded-lg hover:bg-paper-100 hover:text-ink-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:ring-offset-1 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-space-4 py-2 font-title-sm text-title-sm text-paper-0 bg-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 flex items-center gap-2 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="check">check</span>
            {isSubmitting ? 'Saving…' : 'Save Session'}
          </button>
        </div>
      </div>
    </div>
  );
};
