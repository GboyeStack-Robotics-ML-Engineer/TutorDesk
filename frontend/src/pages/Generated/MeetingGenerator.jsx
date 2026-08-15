import React, { useState } from 'react';
import { store } from '../../lib/store';
import { createMeeting } from '../../lib/meetings';

// Meeting-link generator (embedded conferencing entry point).
// - Provider toggle: Google Meet or Zoom.
// - Host mode: "my paid account" (enter email) or "TutorDesk-hosted".
// - Generate -> shows the link, copy button, and an embed area.
//
// NOTE: link creation is mocked at the lib/meetings.js seam (a real Meet/Zoom
// link needs a backend + OAuth). The whole UI/flow is real.

export const MeetingGenerator = () => {
  const settings = store.getMeetingSettings();
  const [provider, setProvider] = useState(settings.defaultProvider);
  const [hostMode, setHostMode] = useState(settings.hostMode);
  const [email, setEmail] = useState(settings.ownAccountEmail);
  const [topic, setTopic] = useState('WAEC Mathematics — Tunde Okafor');
  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState(null);
  const [copied, setCopied] = useState(false);

  const recent = store.getMeetings().slice(0, 4);

  const generate = async () => {
    setLoading(true);
    setMeeting(null);
    // persist the chosen settings for next time
    store.setMeetingSettings({ defaultProvider: provider, hostMode, ownAccountEmail: email });
    const m = await createMeeting({ provider, hostMode, ownAccountEmail: email, topic });
    setMeeting(m);
    setLoading(false);
  };

  const copy = () => {
    if (!meeting) return;
    navigator.clipboard?.writeText(meeting.url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-space-5">
      <div>
        <h1 className="font-heading text-title-md text-ink-900">Create a class link</h1>
        <p className="font-caption text-caption text-ink-500">
          Generate a Google Meet or Zoom link and share it with the student.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-5">
        {/* Config */}
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
          {/* Provider */}
          <div>
            <label className="font-label text-label text-ink-700">Provider</label>
            <div className="grid grid-cols-2 gap-space-3 mt-2">
              {[
                { key: 'meet', name: 'Google Meet', icon: 'videocam' },
                { key: 'zoom', name: 'Zoom', icon: 'video_camera_front' },
              ].map((p) => (
                <button key={p.key} onClick={() => setProvider(p.key)}
                  className={`flex items-center gap-space-3 px-space-4 py-space-3 rounded-lg border transition-all ${
                    provider === p.key ? 'border-primary bg-primary-container text-on-primary-container' : 'border-paper-300 bg-paper-0 text-ink-700'
                  }`}>
                  <span className="material-symbols-outlined">{p.icon}</span>
                  <span className="font-label text-label">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Host mode */}
          <div>
            <label className="font-label text-label text-ink-700">Host with</label>
            <div className="flex flex-col gap-space-2 mt-2">
              <label className={`flex items-start gap-space-3 px-space-4 py-space-3 rounded-lg border cursor-pointer ${hostMode === 'own' ? 'border-primary bg-primary-container/40' : 'border-paper-300'}`}>
                <input type="radio" name="host" checked={hostMode === 'own'} onChange={() => setHostMode('own')} className="mt-1" />
                <div className="flex-1">
                  <div className="font-label text-label text-ink-900">My own paid account</div>
                  <div className="font-caption text-caption text-ink-500">Use your {provider === 'zoom' ? 'Zoom' : 'Google'} account so recordings and settings are yours.</div>
                  {hostMode === 'own' && (
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your-account@email.com"
                      className="w-full mt-2 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
                  )}
                </div>
              </label>
              <label className={`flex items-start gap-space-3 px-space-4 py-space-3 rounded-lg border cursor-pointer ${hostMode === 'hosted' ? 'border-primary bg-primary-container/40' : 'border-paper-300'}`}>
                <input type="radio" name="host" checked={hostMode === 'hosted'} onChange={() => setHostMode('hosted')} className="mt-1" />
                <div>
                  <div className="font-label text-label text-ink-900">TutorDesk-hosted</div>
                  <div className="font-caption text-caption text-ink-500">We create the room for you — no account needed.</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="font-label text-label text-ink-700">Session topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
          </div>

          <button onClick={generate} disabled={loading || (hostMode === 'own' && !email)}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-space-4 py-2.5 rounded-lg font-label text-label disabled:opacity-50">
            {loading ? (
              <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Generating…</>
            ) : (
              <><span className="material-symbols-outlined text-[18px]">add_link</span> Generate link</>
            )}
          </button>
        </div>

        {/* Result / embed */}
        <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
          <h2 className="font-label text-label text-ink-700">Meeting</h2>
          {!meeting ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-ink-500 py-space-8">
              <span className="material-symbols-outlined text-[40px] mb-2">videocam</span>
              <p className="font-caption text-caption">Your generated link and its preview appear here.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-space-3 p-space-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary">
                  {meeting.provider === 'zoom' ? 'video_camera_front' : 'videocam'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-body text-primary truncate">{meeting.url}</div>
                  <div className="font-caption text-caption text-ink-500">Host: {meeting.host}</div>
                </div>
                <button onClick={copy} className="flex items-center gap-1 border border-paper-300 px-space-3 py-1.5 rounded-lg font-label text-caption text-ink-700">
                  <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Embed area (visual placeholder for the provider's iframe) */}
              <div className="rounded-lg overflow-hidden border border-paper-200 bg-[#0f1c1a] aspect-video flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-white/70 text-[36px] mb-2">
                  {meeting.provider === 'zoom' ? 'video_camera_front' : 'videocam'}
                </span>
                <p className="font-label text-label text-white/90">
                  {meeting.provider === 'zoom' ? 'Zoom' : 'Google Meet'} room ready
                </p>
                <p className="font-caption text-caption text-white/50 mt-1 px-space-4">
                  Embeds here in the live classroom when the class starts.
                </p>
                <a href={meeting.url} target="_blank" rel="noreferrer"
                  className="mt-space-3 inline-flex items-center gap-1 bg-primary text-on-primary px-space-4 py-2 rounded-lg font-label text-label">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span> Open link
                </a>
              </div>
              <p className="font-caption text-caption text-ink-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Demo link. Connect a {meeting.provider === 'zoom' ? 'Zoom' : 'Google'} account on the backend to make it a live room.
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
                <span className="material-symbols-outlined text-ink-500">{m.provider === 'zoom' ? 'video_camera_front' : 'videocam'}</span>
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
