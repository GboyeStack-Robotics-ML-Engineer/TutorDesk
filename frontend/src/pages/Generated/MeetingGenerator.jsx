import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../lib/store';
import { createMeeting } from '../../lib/meetings';
import { api, NetworkError } from '../../lib/api';

// Meeting-link generator — Google Meet only, via the tutor's connected
// Google account. See lib/meetings.js for why Zoom and a "TutorDesk-hosted"
// room aren't offered here.
//
// Google blocks Meet from being embedded in an iframe, so there's no
// "embed area" — the link opens in a new tab, same as it would from
// Google Calendar itself.

export const MeetingGenerator = () => {
  const [googleConnected, setGoogleConnected] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const recent = store.getMeetings().slice(0, 4);

  useEffect(() => {
    let cancelled = false;
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

  const generate = async () => {
    setLoading(true);
    setError('');
    setMeeting(null);
    try {
      const m = await createMeeting({ topic });
      setMeeting(m);
    } catch (err) {
      setError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not generate a Meet link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (!meeting) return;
    navigator.clipboard?.writeText(meeting.url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-space-5" data-live-page="meeting-generator">
      <div>
        <h1 className="font-heading text-title-md text-ink-900">Create a class link</h1>
        <p className="font-caption text-caption text-ink-500">
          Generate a real Google Meet link for a session and share it with the student.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-5">
        {/* Config */}
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
          {googleConnected === false && (
            <p className="font-caption text-caption text-ink-500 bg-surface-container-low rounded-lg p-3">
              Connect Google Calendar in{' '}
              <Link to="/portal/view/settings-data-sync-preferences" className="text-primary underline">
                Settings
              </Link>{' '}
              to generate Meet links. Zoom isn't supported — that would need a separate Zoom account
              connection we don't have set up.
            </p>
          )}

          <div>
            <label className="font-label text-label text-ink-700" htmlFor="topic">Session topic</label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. WAEC Mathematics — Tunde Okafor"
              disabled={googleConnected !== true}
              className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary disabled:opacity-60"
            />
          </div>

          <button
            onClick={generate}
            disabled={loading || googleConnected !== true}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-space-4 py-2.5 rounded-lg font-label text-label disabled:opacity-50"
          >
            {loading ? (
              <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Generating…</>
            ) : (
              <><span className="material-symbols-outlined text-[18px]">add_link</span> Generate Meet link</>
            )}
          </button>

          {error && (
            <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
              {error}
            </p>
          )}
        </div>

        {/* Result */}
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
          <h2 className="font-label text-label text-ink-700">Meeting</h2>
          {!meeting ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-ink-500 py-space-8">
              <span className="material-symbols-outlined text-[40px] mb-2">videocam</span>
              <p className="font-caption text-caption">Your generated link appears here.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-space-3 p-space-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary">videocam</span>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-body text-primary truncate">{meeting.url}</div>
                  <div className="font-caption text-caption text-ink-500">Host: {meeting.host}</div>
                </div>
                <button onClick={copy} className="flex items-center gap-1 border border-paper-300 px-space-3 py-1.5 rounded-lg font-label text-caption text-ink-700">
                  <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <a href={meeting.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-space-4 py-2.5 rounded-lg font-label text-label">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span> Open in Google Meet
              </a>
              <p className="font-caption text-caption text-ink-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Google Meet can't be embedded in another site, so this opens in a new tab — same as joining from Google Calendar.
              </p>
            </>
          )}
        </div>
      </div>

      {recent.length > 0 && (
        <div>
          <h2 className="font-label text-label text-ink-700 mb-space-3">Recent links</h2>
          <div className="flex flex-col gap-space-2">
            {recent.map((m) => (
              <div key={m.id} className="flex items-center gap-space-3 bg-paper-0 border border-paper-200 rounded-lg px-space-4 py-space-3">
                <span className="material-symbols-outlined text-ink-500">videocam</span>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-body text-ink-900 truncate">{m.topic}</div>
                  <div className="font-caption text-caption text-primary truncate">{m.url}</div>
                </div>
                <span className="font-caption text-caption text-ink-500">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
