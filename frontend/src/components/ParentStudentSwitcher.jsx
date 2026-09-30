import React from 'react';

// Only rendered when a parent has more than one linked child — a single-
// student parent (or any student login) never sees this.
export const ParentStudentSwitcher = ({ students, studentId, onChange }) => {
  if (students.length <= 1) return null;
  return (
    <div className="mb-space-4 flex items-center gap-space-2">
      <label className="font-label text-label text-ink-700" htmlFor="parent-student-switch">Child</label>
      <select
        id="parent-student-switch"
        value={studentId}
        onChange={(e) => onChange(e.target.value)}
        className="border border-paper-300 rounded-lg px-3 py-1.5 font-body text-body focus:outline-none focus:border-primary"
      >
        {students.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>
  );
};
