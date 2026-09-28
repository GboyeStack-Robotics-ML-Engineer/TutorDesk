// Meeting-link generation for Google Meet and Zoom.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │  MOCK SEAM — READ THIS                                                   │
// │                                                                          │
// │  Creating a REAL Meet/Zoom link requires a backend with OAuth + the      │
// │  provider's API (secrets cannot live in frontend code — the providers    │
// │  block it by design). So this function fabricates a realistic link for   │
// │  the demo. To go live, replace the body of `createMeeting` with a single │
// │  fetch() to your backend endpoint that calls the real API and returns    │
// │  { url }. Nothing else in the app needs to change.                       │
// │                                                                          │
// │  Real endpoints you'd call from the backend:                             │
// │   - Google Meet: Calendar API events.insert with conferenceData          │
// │   - Zoom:        POST /users/{userId}/meetings                           │
// └─────────────────────────────────────────────────────────────────────────┘

import { store, uid } from './store';

function randomToken(len) {
  const c = 'abcdefghijklmnopqrstuvwxyz';
  let s = '';
  for (let i = 0; i < len; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

// Produces a realistic-looking provider link. MOCK.
function fakeLink(provider) {
  if (provider === 'zoom') {
    const id = Math.floor(1000000000 + Math.random() * 8999999999);
    return `https://zoom.us/j/${id}?pwd=${randomToken(10)}`;
  }
  // google meet style: xxx-xxxx-xxx
  return `https://meet.google.com/${randomToken(3)}-${randomToken(4)}-${randomToken(3)}`;
}

/**
 * Create a meeting link.
 * @param {Object} opts
 * @param {'meet'|'zoom'} opts.provider
 * @param {'own'|'hosted'} opts.hostMode  - own = tutor's paid account, hosted = TutorDesk-hosted
 * @param {string} [opts.ownAccountEmail] - required when hostMode === 'own'
 * @param {string} [opts.topic]
 * @param {string} [opts.startsAt]
 * @returns {Promise<{id,url,provider,hostMode,host,topic,startsAt,createdAt}>}
 */
export async function createMeeting({ provider, hostMode, ownAccountEmail, topic, startsAt }) {
  // simulate network latency so the UI's loading state is visible
  await new Promise((r) => setTimeout(r, 650));

  // ===== BEGIN MOCK (replace with one backend fetch to go live) =====
  const url = fakeLink(provider);
  // ===== END MOCK =====

  const host =
    hostMode === 'own'
      ? (ownAccountEmail || 'your-account@email.com')
      : `TutorDesk-hosted (${provider === 'zoom' ? 'Zoom' : 'Google Meet'})`;

  const meeting = {
    id: uid('mtg'),
    url,
    provider,
    hostMode,
    host,
    topic: topic || 'Tutoring session',
    startsAt: startsAt || null,
    createdAt: new Date().toISOString(),
    mock: true,
  };
  store.saveMeeting(meeting);
  return meeting;
}
