import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Live classroom — real class data, real Meet link, no in-app video call.
//
// Google blocks Meet (and any other provider we could actually reach from
// this codebase — no Zoom OAuth app, no hosted conferencing infra) from
// being embedded in an iframe, so a genuinely "embedded" call is not
// something this app can build. What's real instead: the session's actual
// details, and a button that joins the actual meeting in a new tab.

function formatWhen(startsAt) {
  const date = new Date(startsAt);
  return `${date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })} · ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}

export const LiveClassroomDesktop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('id');

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loaded = classId
      ? api.classes.get(classId)
      : api.classes.list({ pageSize: 200 }).then((data) =>
          (data?.results || [])
            .filter((c) => c.status === 'scheduled')
            .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0] || null
        );

    loaded
      .then((match) => {
        if (cancelled) return;
        setSession(match || null);
        if (!match) {
          setError(classId ? "That session couldn't be found." : "You don't have an upcoming session scheduled.");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your schedule — the backend isn't reachable yet."
            : err.message || "Couldn't load your schedule."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [classId]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-5" data-live-page="live-classroom">
      <div>
        <h1 className="font-heading text-title-md text-ink-900">Live classroom</h1>
        <p className="font-caption text-caption text-ink-500">
          Join your session's Google Meet room. It opens in a new tab — Google doesn't allow Meet
          to be embedded inside another site.
        </p>
      </div>

      {loading && <p className="font-body text-body text-ink-500">Loading…</p>}

      {!loading && error && (
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 text-center flex flex-col items-center gap-space-3">
          <span className="material-symbols-outlined text-[40px] text-ink-500">event_busy</span>
          <p className="font-body text-body text-ink-700">{error}</p>
          <Link to="/portal/schedule" className="font-label text-label text-primary">Back to My Schedule</Link>
        </div>
      )}

      {!loading && session && (
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 flex flex-col gap-space-4">
          <div>
            <h2 className="font-title-lg text-title-lg text-ink-900">{session.subject || 'Session'}</h2>
            {session.studentName && (
              <p className="font-body text-body text-ink-700 flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-[18px]">school</span> {session.studentName}
              </p>
            )}
            <p className="font-caption text-caption text-ink-500 mt-1">{formatWhen(session.startsAt)}</p>
          </div>

          {session.meetLink ? (
            <a
              href={session.meetLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-on-primary px-space-4 py-3 rounded-lg font-label text-label"
            >
              <span className="material-symbols-outlined text-[20px]">videocam</span> Join in Google Meet
            </a>
          ) : (
            <p className="font-caption text-caption text-ink-500 bg-surface-container-low rounded-lg p-3">
              No meeting link on this session yet.{' '}
              <Link to="/portal/view/meeting-generator" className="text-primary underline">
                Generate one
              </Link>{' '}
              and add it, or connect Google Calendar in Settings so future TutorDesk-platform classes get one automatically.
            </p>
          )}

          <button
            onClick={() => navigate(`/portal/view/classroom-post-class-wrap?id=${session.id}`)}
            className="flex items-center justify-center gap-2 border border-paper-300 text-ink-700 px-space-4 py-2.5 rounded-lg font-label text-label hover:bg-paper-100"
          >
            <span className="material-symbols-outlined text-[18px]">task_alt</span> Mark session complete
          </button>
        </div>
      )}
    </div>
  );
};
