// Meeting-link generation — real Google Meet links only, via the tutor's
// connected Google account (see core/services/google.py's
// create_quick_meet_link and POST /api/google/meet-link/).
//
// Zoom and a "TutorDesk-hosted" room are deliberately not offered: Zoom
// would need its own separate OAuth app and paid API credentials we don't
// have, and a hosted room would mean running conferencing infrastructure
// ourselves. Rather than fake either, this only exposes what's real —
// Google Meet, through the same Google account already connected for
// Calendar/Tasks sync (see Settings → Data & Sync).

import { store, uid } from './store';
import { api } from './api';

/**
 * Create a real, ad-hoc Google Meet link. Throws ApiError (e.g. "not
 * connected") or NetworkError, same as any other api.js call — callers
 * handle those directly rather than getting a silently-fake link back.
 * @param {Object} opts
 * @param {string} [opts.topic]
 * @returns {Promise<{id,url,provider,host,topic,createdAt}>}
 */
export async function createMeeting({ topic } = {}) {
  const { url } = await api.google.createMeetLink({ topic });

  const meeting = {
    id: uid('mtg'),
    url,
    provider: 'meet',
    host: 'Your Google account',
    topic: topic || 'Tutoring session',
    createdAt: new Date().toISOString(),
  };
  store.saveMeeting(meeting);
  return meeting;
}
