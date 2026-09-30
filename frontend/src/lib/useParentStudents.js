import { useState, useEffect } from 'react';
import { api, NetworkError } from './api';

// Shared by every /parent/* page: which of the parent's (possibly several)
// linked children the page is showing data for. A student login always
// gets exactly one. Defaults to the first student alphabetically once
// loaded; pages needing more than one child show the built-in selector.
export function useParentStudents() {
  const [students, setStudents] = useState(null); // null = still loading
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.parent
      .students()
      .then((list) => {
        if (cancelled) return;
        setStudents(list || []);
        if ((list || []).length) setStudentId(list[0].id);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your students — the backend isn't reachable yet."
            : err.message || "Couldn't load your students."
        );
        setStudents([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { students: students || [], studentId, setStudentId, studentsError: error, loadingStudents: students === null };
}
