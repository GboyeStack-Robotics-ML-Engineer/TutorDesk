import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../lib/store';

// Live in-app classroom — the embedded conferencing surface.
// Reads the most recent generated meeting (provider + link) from the store so
// it ties into the "create a class link" step. Full call controls: mic, camera,
// screen-share, whiteboard, raise-hand, chat, participants, end-class.

const controls = [
  { key: 'mic', on: 'mic', off: 'mic_off', label: 'Mute' },
  { key: 'cam', on: 'videocam', off: 'videocam_off', label: 'Camera' },
  { key: 'share', on: 'screen_share', off: 'stop_screen_share', label: 'Share screen' },
  { key: 'board', on: 'draw', off: 'draw', label: 'Whiteboard' },
  { key: 'hand', on: 'front_hand', off: 'front_hand', label: 'Raise hand' },
];

export const LiveClassroomDesktop = () => {
  const navigate = useNavigate();
  const meeting = store.getMeetings()[0]; // most recent generated link, if any
  const providerName = meeting ? (meeting.provider === 'zoom' ? 'Zoom' : 'Google Meet') : 'TutorDesk';
  const link = meeting?.url || 'meet.tutordesk.ng/c/8fk2';

  const [state, setState] = useState({ mic: true, cam: true, share: false, board: false, hand: false });
  const [chatOpen, setChatOpen] = useState(true);
  const [seconds, setSeconds] = useState(11);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState([
    { who: 'Tunde', text: 'Good afternoon ma!', me: false },
    { who: 'You', text: 'Afternoon Tunde. Open to page 24.', me: true },
  ]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));
  const copyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { who: 'You', text: draft.trim(), me: true }]);
    setDraft('');
  };

  return (
    <div className="flex flex-col gap-space-4" style={{ minHeight: '78vh' }}>
      <div className="flex flex-wrap items-center justify-between gap-space-3">
        <div className="flex items-center gap-space-3">
          <span className="inline-flex items-center gap-1.5 px-space-3 py-1 rounded-full bg-danger-tint text-danger-solid font-label text-caption font-semibold">
            <span className="w-2 h-2 rounded-full bg-danger-solid animate-pulse" /> LIVE
          </span>
          <div>
            <h1 className="font-heading text-title-md text-ink-900 leading-tight">WAEC Mathematics — Tunde Okafor</h1>
            <p className="font-caption text-caption text-ink-500">Algebra: simultaneous equations · {providerName} · 1-on-1</p>
          </div>
        </div>
        <div className="flex items-center gap-space-3">
          <div className="flex items-center gap-2 font-mono text-body text-ink-700 bg-surface-container-low px-space-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[18px]">timer</span> {mmss}
          </div>
          <button onClick={copyLink} className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container border border-paper-300 px-space-3 py-1.5 rounded-lg font-label text-label text-ink-700 max-w-[240px]">
            <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'link'}</span>
            <span className="truncate">{copied ? 'Link copied' : link}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-space-4 flex-1" style={{ minHeight: 0 }}>
        <div className="flex-1 flex flex-col gap-space-3">
          <div className="relative flex-1 rounded-xl overflow-hidden bg-[#0f1c1a] flex items-center justify-center" style={{ minHeight: 340 }}>
            {state.board ? (
              <div className="absolute inset-0 bg-white flex flex-col">
                <div className="flex items-center gap-space-3 px-space-4 py-space-2 border-b border-paper-200 bg-paper-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">draw</span>
                  <span className="font-label text-label text-ink-700">Shared whiteboard</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="w-5 h-5 rounded-full bg-[#005248]" />
                    <span className="w-5 h-5 rounded-full bg-[#C48037]" />
                    <span className="w-5 h-5 rounded-full bg-[#B3261E]" />
                    <span className="material-symbols-outlined text-ink-500 text-[20px] ml-2">ink_eraser</span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center text-ink-500">
                  <div className="text-center">
                    <div className="font-mono text-title-md text-ink-700">2x + 3y = 12</div>
                    <div className="font-mono text-title-md text-ink-700 mt-2">4x − y = 5</div>
                    <p className="font-caption text-caption text-ink-500 mt-4">Drawing on the shared board…</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-heading text-display-sm text-inverse-primary">TO</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/45 text-white px-space-3 py-1 rounded-lg font-label text-caption">
                  <span className="material-symbols-outlined text-[16px]">{state.mic ? 'mic' : 'mic_off'}</span> Tunde Okafor
                </div>
              </>
            )}
            {state.share && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary text-on-primary px-space-3 py-1 rounded-lg font-label text-caption">
                <span className="material-symbols-outlined text-[16px]">screen_share</span> You are presenting
              </div>
            )}
            <div className="absolute bottom-3 right-3 w-40 h-28 rounded-lg overflow-hidden bg-[#12302b] border border-white/10 flex items-center justify-center">
              {state.cam ? (
                <div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="font-heading text-title-sm text-secondary-fixed">AB</span>
                </div>
              ) : (
                <span className="material-symbols-outlined text-white/40 text-[28px]">videocam_off</span>
              )}
              <div className="absolute bottom-1.5 left-1.5 text-white/90 font-label text-[10px] bg-black/40 px-2 py-0.5 rounded">You (Aisha)</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-space-3 bg-surface-container-low rounded-xl py-space-3 px-space-4 flex-wrap">
            {controls.map((c) => {
              const active = state[c.key];
              const offStyle = (c.key === 'mic' || c.key === 'cam') && !active;
              return (
                <button key={c.key} onClick={() => toggle(c.key)} title={c.label}
                  className={`flex flex-col items-center gap-1 px-space-3 py-2 rounded-lg transition-all ${
                    offStyle ? 'bg-danger-tint text-danger-solid'
                    : active && (c.key === 'share' || c.key === 'board' || c.key === 'hand') ? 'bg-primary-container text-on-primary-container'
                    : 'text-ink-700 hover:bg-surface-container'
                  }`}>
                  <span className="material-symbols-outlined text-[22px]">{active ? c.on : c.off}</span>
                  <span className="font-label text-[10px]">{c.label}</span>
                </button>
              );
            })}
            <div className="w-px h-10 bg-paper-300 mx-1" />
            <button onClick={() => setChatOpen((v) => !v)} title="Chat"
              className={`flex flex-col items-center gap-1 px-space-3 py-2 rounded-lg transition-all ${chatOpen ? 'bg-primary-container text-on-primary-container' : 'text-ink-700 hover:bg-surface-container'}`}>
              <span className="material-symbols-outlined text-[22px]">chat</span>
              <span className="font-label text-[10px]">Chat</span>
            </button>
            <button onClick={() => navigate('/portal/view/classroom-post-class-wrap')} title="End class"
              className="flex items-center gap-2 bg-danger-solid text-white px-space-4 py-2.5 rounded-lg font-label text-label hover:opacity-90 ml-1">
              <span className="material-symbols-outlined text-[20px]">call_end</span> End class
            </button>
          </div>
        </div>

        {chatOpen && (
          <div className="w-80 flex flex-col gap-space-3" style={{ minWidth: 300 }}>
            <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4">
              <div className="flex items-center justify-between mb-space-3">
                <h3 className="font-label text-label text-ink-700">Participants</h3>
                <span className="font-caption text-caption text-ink-500 bg-surface-container-low px-2 py-0.5 rounded-full">2</span>
              </div>
              <div className="flex flex-col gap-space-2">
                <div className="flex items-center gap-space-3">
                  <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center font-heading text-caption text-secondary-fixed-variant">AB</div>
                  <div className="flex-1">
                    <p className="font-label text-label text-ink-900">Aisha Bello <span className="text-ink-500 font-caption">(you)</span></p>
                    <p className="font-caption text-caption text-primary">Host · Tutor</p>
                  </div>
                  <span className="material-symbols-outlined text-ink-500 text-[18px]">{state.mic ? 'mic' : 'mic_off'}</span>
                </div>
                <div className="flex items-center gap-space-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-heading text-caption text-primary">TO</div>
                  <div className="flex-1">
                    <p className="font-label text-label text-ink-900">Tunde Okafor</p>
                    <p className="font-caption text-caption text-ink-500">Student</p>
                  </div>
                  <span className="material-symbols-outlined text-ink-500 text-[18px]">mic</span>
                </div>
              </div>
            </div>

            <div className="bg-paper-0 border border-paper-200 rounded-xl flex-1 flex flex-col overflow-hidden" style={{ minHeight: 240 }}>
              <div className="px-space-4 py-space-3 border-b border-paper-200"><h3 className="font-label text-label text-ink-700">In-class chat</h3></div>
              <div className="flex-1 overflow-y-auto p-space-4 flex flex-col gap-space-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.me ? 'items-end' : 'items-start'}`}>
                    <span className="font-caption text-[11px] text-ink-500 mb-0.5">{m.who}</span>
                    <div className={`px-space-3 py-2 rounded-lg font-body text-body max-w-[85%] ${m.me ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-ink-900'}`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-space-3 border-t border-paper-200 flex items-center gap-2">
                <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Message the class…"
                  className="flex-1 bg-surface-container-low border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
                <button onClick={send} className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:opacity-90">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
