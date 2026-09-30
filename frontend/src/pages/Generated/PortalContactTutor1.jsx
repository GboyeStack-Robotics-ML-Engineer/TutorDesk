import React, { useState, useEffect } from 'react';
import { api, NetworkError } from '../../lib/api';
import { useParentStudents } from '../../lib/useParentStudents';
import { ParentStudentSwitcher } from '../../components/ParentStudentSwitcher';

// No real messaging inbox exists between parent and tutor — the real
// channel is WhatsApp (the same one the rest of the app already uses for
// reminders/reports/Q&A). "Send Message" below opens a prefilled WhatsApp
// chat rather than pretending to deliver into a fake internal system.

function digitsOnly(raw) {
  return (raw || '').replace(/\D/g, '');
}

export const PortalContactTutor1 = () => {
  const { students, studentId, setStudentId, studentsError, loadingStudents } = useParentStudents();
  const [tutor, setTutor] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!studentId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    api.parent
      .dashboard({ studentId })
      .then((data) => {
        if (!cancelled) setTutor(data.tutor || null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your tutor's details — the backend isn't reachable yet."
            : err.message || "Couldn't load your tutor's details."
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
    return <p className="font-body text-body text-ink-500" data-live-page="contact-tutor">Loading…</p>;
  }

  if (studentsError || error) {
    return (
      <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-4" data-live-page="contact-tutor">
        {studentsError || error}
      </p>
    );
  }

  if (!students.length) {
    return (
      <div data-live-page="contact-tutor" className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 text-center">
        <p className="font-body text-body text-ink-700">No students are linked to your account yet.</p>
      </div>
    );
  }

  const currentStudent = students.find((s) => s.id === studentId);
  const whatsappPhone = digitsOnly(tutor?.phone);
  const waText = encodeURIComponent(subject ? `${subject}\n\n${message}` : message);
  const waLink = whatsappPhone ? `https://wa.me/${whatsappPhone}${waText ? `?text=${waText}` : ''}` : null;

  return (
    <div data-live-page="contact-tutor">
      <ParentStudentSwitcher students={students} studentId={studentId} onChange={setStudentId} />

      {!tutor?.name ? (
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 text-center">
          <p className="font-body text-body text-ink-700">No tutor assigned to this student yet.</p>
        </div>
      ) : (
        <>
          <section className="flex flex-col md:flex-row items-center md:items-start gap-space-6 mb-space-8 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-paper-200 shrink-0 shadow-[0_2px_12px_rgba(22,33,30,0.06)] bg-primary-container flex items-center justify-center">
              <span className="font-heading text-title-lg text-on-primary-container">
                {tutor.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col justify-center pt-2">
              <h2 className="font-display-md text-display-md text-ink-900 mb-1">{tutor.name}</h2>
              {currentStudent?.subjects?.length > 0 && (
                <p className="font-body-lg text-body-lg text-ink-700 mb-space-2">
                  {currentStudent.subjects.join(', ')} tutor for {currentStudent.name}
                </p>
              )}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-space-4 mb-space-8">
            {waLink ? (
              <a href={waLink} target="_blank" rel="noreferrer"
                className="group flex items-center gap-space-4 p-space-4 rounded-xl border border-success-solid bg-paper-0 hover:bg-success-tint/30 transition-all duration-200 text-left shadow-[0_2px_8px_rgba(22,33,30,0.03)]">
                <div className="w-12 h-12 rounded-full bg-success-tint text-success-solid flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <div className="flex-1">
                  <span className="block font-title-sm text-title-sm text-ink-900 mb-0.5">WhatsApp</span>
                  <span className="block font-caption text-caption text-ink-500">Opens a chat with {tutor.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-paper-300 flex items-center justify-center text-ink-500">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-space-4 p-space-4 rounded-xl border border-paper-300 bg-paper-100 opacity-70">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-ink-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <span className="font-caption text-caption text-ink-500">No phone number on file for this tutor.</span>
              </div>
            )}

            {tutor.email ? (
              <a href={`mailto:${tutor.email}`}
                className="group flex items-center gap-space-4 p-space-4 rounded-xl border border-paper-300 bg-paper-0 hover:bg-paper-50 transition-all duration-200 text-left shadow-[0_2px_8px_rgba(22,33,30,0.03)]">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-ink-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex-1">
                  <span className="block font-title-sm text-title-sm text-ink-900 mb-0.5">Email</span>
                  <span className="block font-caption text-caption text-ink-500">{tutor.email}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-paper-300 flex items-center justify-center text-ink-500">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-space-4 p-space-4 rounded-xl border border-paper-300 bg-paper-100 opacity-70">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-ink-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span className="font-caption text-caption text-ink-500">No email on file for this tutor.</span>
              </div>
            )}
          </section>

          {waLink !== null && (
            <section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 md:p-space-8 shadow-[0_4px_24px_rgba(22,33,30,0.04)]">
              <div className="flex items-center gap-3 mb-space-6">
                <span className="material-symbols-outlined text-primary">chat_bubble</span>
                <h3 className="font-title-md text-title-md text-ink-900">Send a Message</h3>
              </div>
              <p className="font-caption text-caption text-ink-500 mb-space-4">
                There's no separate inbox here — this opens a WhatsApp chat with {tutor.name}, prefilled with what you write below.
              </p>
              <div className="flex flex-col gap-space-6">
                <div className="flex flex-col gap-space-2">
                  <label className="font-label text-label text-ink-900" htmlFor="message-subject">Subject</label>
                  <input
                    className="w-full h-12 px-4 border border-paper-300 rounded-lg bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body text-ink-900 placeholder:text-ink-500"
                    id="message-subject" placeholder="e.g., Question regarding this week's class" type="text"
                    value={subject} onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-space-2">
                  <label className="font-label text-label text-ink-900" htmlFor="message-body">Message</label>
                  <textarea
                    className="w-full p-4 border border-paper-300 rounded-lg bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body text-ink-900 placeholder:text-ink-500 resize-y"
                    id="message-body" placeholder="Write your message here…" rows="5"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="flex justify-end pt-space-2 border-t border-paper-100 mt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-primary hover:bg-primary-container text-on-primary font-label text-label px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <span>Send via WhatsApp</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </a>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
