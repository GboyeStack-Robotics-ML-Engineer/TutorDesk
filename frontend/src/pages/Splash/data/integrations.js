/**
 * The scattered tools a tutor juggles before TutorDesk.
 *
 * Rendered by <HeroConstellation /> as nodes orbiting the TutorDesk mark.
 * Order matters: nodes are laid out clockwise from the top in this order,
 * so related tools are grouped (messaging, then live class, then money).
 *
 * To swap an integration, edit this array only — the layout is derived.
 */
export const integrations = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'chat', tint: '#25A366' },
  { id: 'sms', name: 'SMS', icon: 'sms', tint: '#5B8DEF' },
  { id: 'email', name: 'Email', icon: 'mail', tint: '#C4483C' },
  { id: 'zoom', name: 'Zoom', icon: 'videocam', tint: '#2D8CFF' },
  { id: 'calendly', name: 'Calendly', icon: 'event', tint: '#1A6BC4' },
  { id: 'sheets', name: 'Spreadsheets', icon: 'table_chart', tint: '#1D8A50' },
  { id: 'paystack', name: 'Paystack', icon: 'payments', tint: '#00C3F7' },
  { id: 'bank', name: 'Bank transfer', icon: 'account_balance', tint: '#C48037' },
];
