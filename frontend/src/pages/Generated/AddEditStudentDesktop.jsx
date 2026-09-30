import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// The core MVP seam: submitting this form is what triggers the parent's
// real WhatsApp onboarding (see docs/PRD.md). Everything above the parent's
// WhatsApp number is useful context for the tutor, but that one field is
// the one nothing else in the product works without.

const inputLabel = 'block font-label text-label text-ink-700 mb-1';
const inputField = 'w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-2 focus-ring text-on-surface disabled:opacity-60';
const sectionCard = 'bg-paper-0 border border-paper-200 rounded-lg shadow-sm p-8';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  guardianName: '',
  guardianWhatsapp: '',
  academicLevel: '',
  subjects: '',
  goals: '',
  timezone: 'West Africa Time (WAT) - Lagos',
  sessionLength: '1 Hour',
  availability: [],
  reminderChannel: 'whatsapp',
};

const AVAILABILITY_OPTIONS = ['Weekdays (Morning)', 'Weekdays (Evening)', 'Weekends'];

function looksLikePhoneNumber(value) {
  const digits = value.replace(/[^0-9]/g, '');
  return digits.length >= 10;
}

export const AddEditStudentDesktop = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleAvailability = (option) => {
    setForm((f) => ({
      ...f,
      availability: f.availability.includes(option)
        ? f.availability.filter((a) => a !== option)
        : [...f.availability, option],
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Student name is required.';
    if (!form.guardianName.trim()) next.guardianName = "Parent/guardian's name is required.";
    if (!form.guardianWhatsapp.trim()) {
      next.guardianWhatsapp = "Parent/guardian's WhatsApp number is required — this is what starts onboarding.";
    } else if (!looksLikePhoneNumber(form.guardianWhatsapp)) {
      next.guardianWhatsapp = 'Enter a full phone number, including country code.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.students.add({
        name: form.fullName,
        subject: form.subjects,
        parentName: form.guardianName,
        parentWhatsapp: form.guardianWhatsapp,
        reminderChannel: form.reminderChannel,
        // Extra context the backend can adopt as it needs — not yet part
        // of the minimal MVP contract in docs/PRD.md.
        email: form.email,
        phone: form.phone,
        academicLevel: form.academicLevel,
        goals: form.goals,
        timezone: form.timezone,
        sessionLength: form.sessionLength,
        availability: form.availability,
      });
      navigate('/portal/view/flagged-students-directory-view', {
        state: { studentAdded: form.fullName },
      });
    } catch (err) {
      setSubmitError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not save this student. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-surface-container-low" data-live-page="add-edit-student">
      <div className="max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>

          <section className={sectionCard}>
            <div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
              <span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">person</span>
              <div>
                <h2 className="font-title-md text-title-md text-ink-900">Identity &amp; Contact</h2>
                <p className="font-body text-body text-ink-500">Basic personal information for communication.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={inputLabel} htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  className={inputField}
                  placeholder="e.g. Jane Doe"
                  type="text"
                  value={form.fullName}
                  onChange={setField('fullName')}
                  disabled={isSubmitting}
                />
                {errors.fullName && <p className="font-caption text-caption text-danger-solid mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className={inputLabel} htmlFor="email">Student Email (optional)</label>
                <input
                  id="email"
                  className={inputField}
                  placeholder="jane@example.com"
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className={inputLabel} htmlFor="phone">Student Phone (optional)</label>
                <input
                  id="phone"
                  className={inputField}
                  placeholder="+234 (0) 800 000 0000"
                  type="tel"
                  value={form.phone}
                  onChange={setField('phone')}
                  disabled={isSubmitting}
                />
                <p className="font-caption text-caption text-ink-500 mt-1">Only if the student has their own phone — used for their own reminders later.</p>
              </div>

              <div className="md:col-span-2 mt-2 pt-4 border-t border-dashed border-paper-200">
                <p className="font-label text-label text-primary uppercase tracking-wide mb-3">Parent / Guardian — starts onboarding</p>
              </div>
              <div>
                <label className={inputLabel} htmlFor="guardianName">Parent/Guardian Name</label>
                <input
                  id="guardianName"
                  className={inputField}
                  placeholder="e.g. Mrs. Adaeze Okoye"
                  type="text"
                  value={form.guardianName}
                  onChange={setField('guardianName')}
                  disabled={isSubmitting}
                />
                {errors.guardianName && <p className="font-caption text-caption text-danger-solid mt-1">{errors.guardianName}</p>}
              </div>
              <div>
                <label className={inputLabel} htmlFor="guardianWhatsapp">Parent/Guardian WhatsApp Number</label>
                <input
                  id="guardianWhatsapp"
                  className={inputField}
                  placeholder="+234 801 234 5678"
                  type="tel"
                  value={form.guardianWhatsapp}
                  onChange={setField('guardianWhatsapp')}
                  disabled={isSubmitting}
                />
                {errors.guardianWhatsapp && <p className="font-caption text-caption text-danger-solid mt-1">{errors.guardianWhatsapp}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={inputLabel} htmlFor="reminderChannel">Suggested reminder channel</label>
                <select
                  id="reminderChannel"
                  className={`${inputField} appearance-none`}
                  value={form.reminderChannel}
                  onChange={setField('reminderChannel')}
                  disabled={isSubmitting}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
                <p className="font-caption text-caption text-ink-500 mt-1">A starting point — the parent confirms their own preference during onboarding.</p>
              </div>
            </div>
          </section>

          <section className={sectionCard}>
            <div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
              <span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">school</span>
              <div>
                <h2 className="font-title-md text-title-md text-ink-900">Academic Profile</h2>
                <p className="font-body text-body text-ink-500">Current level, subjects of interest, and learning objectives.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={inputLabel} htmlFor="academicLevel">Current Academic Level</label>
                <select
                  id="academicLevel"
                  className={`${inputField} appearance-none`}
                  value={form.academicLevel}
                  onChange={setField('academicLevel')}
                  disabled={isSubmitting}
                >
                  <option value="">Select Level...</option>
                  <option>Primary / Elementary</option>
                  <option>Junior Secondary (JSS)</option>
                  <option>Senior Secondary (SSS)</option>
                  <option>Undergraduate</option>
                  <option>Professional</option>
                </select>
              </div>
              <div>
                <label className={inputLabel} htmlFor="subjects">Primary Subjects</label>
                <input
                  id="subjects"
                  className={inputField}
                  placeholder="e.g. Mathematics, Physics (comma separated)"
                  type="text"
                  value={form.subjects}
                  onChange={setField('subjects')}
                  disabled={isSubmitting}
                />
              </div>
              <div className="md:col-span-2">
                <label className={inputLabel} htmlFor="goals">Learning Goals &amp; Notes</label>
                <textarea
                  id="goals"
                  className={`${inputField} h-24 resize-none`}
                  placeholder="Briefly describe what the student aims to achieve..."
                  value={form.goals}
                  onChange={setField('goals')}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </section>

          <section className={sectionCard}>
            <div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
              <span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">schedule</span>
              <div>
                <h2 className="font-title-md text-title-md text-ink-900">Logistics &amp; Scheduling</h2>
                <p className="font-body text-body text-ink-500">Timezone and preferred availability for sessions.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={inputLabel} htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  className={`${inputField} appearance-none`}
                  value={form.timezone}
                  onChange={setField('timezone')}
                  disabled={isSubmitting}
                >
                  <option>West Africa Time (WAT) - Lagos</option>
                  <option>Greenwich Mean Time (GMT) - London</option>
                  <option>Eastern Standard Time (EST) - New York</option>
                </select>
              </div>
              <div>
                <label className={inputLabel} htmlFor="sessionLength">Preferred Session Length</label>
                <select
                  id="sessionLength"
                  className={`${inputField} appearance-none`}
                  value={form.sessionLength}
                  onChange={setField('sessionLength')}
                  disabled={isSubmitting}
                >
                  <option>1 Hour</option>
                  <option>1.5 Hours</option>
                  <option>2 Hours</option>
                </select>
              </div>
              <div className="md:col-span-2 mt-2">
                <span className={`${inputLabel} mb-2`}>General Availability</span>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2 bg-surface border border-paper-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-paper-100 transition-colors">
                      <input
                        className="rounded text-primary focus:ring-primary w-4 h-4 border-outline-variant"
                        type="checkbox"
                        checked={form.availability.includes(option)}
                        onChange={() => toggleAvailability(option)}
                        disabled={isSubmitting}
                      />
                      <span className="font-caption text-caption text-ink-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {submitError && (
            <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-4">
              {submitError}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-title-sm text-title-sm hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving…' : 'Add Student'}
            </button>
          </div>
        </form>

        <div className="h-12"></div>
      </div>
    </div>
  );
};
