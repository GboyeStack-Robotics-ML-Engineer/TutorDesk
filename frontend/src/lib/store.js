// Tiny localStorage-backed store for the functional demo.
//
// One namespaced key holds the whole app state as JSON. On first load we seed
// demo data so every screen has something to show. Everything (invoices,
// quizzes, brand, meetings, materials) reads and writes through here, so the
// demo persists across reloads without a backend.
//
// Swap this module for real API calls later; the shape stays the same.

const KEY = 'tutordesk_v1';

const seed = () => ({
  brand: {
    // Set during onboarding. If logoDataUrl is present we use extracted colours;
    // otherwise the tutor picks colours + invoiceName manually.
    logoDataUrl: null,
    primaryColor: '#005248',
    secondaryColor: '#C48037',
    invoiceName: 'Aisha Bello Tutorials',
    tutorName: 'Aisha Bello',
    email: 'aisha.bello@example.com',
    phone: '+234 801 234 5678',
    address: 'Lagos, Nigeria',
  },
  students: [
    { id: 'stu_1', name: 'Tunde Okafor', subject: 'WAEC Mathematics', parentName: 'Mrs. Okafor', parentPhone: '2348033334444', fee: 15000 },
    { id: 'stu_2', name: 'Zainab Musa', subject: 'Physics', parentName: 'Mr. Musa', parentPhone: '2348055556666', fee: 18000 },
    { id: 'stu_3', name: 'David Eze', subject: 'Chemistry', parentName: 'Mrs. Eze', parentPhone: '2348077778888', fee: 16000 },
  ],
  invoices: [
    {
      id: 'inv_1001', studentId: 'stu_1', studentName: 'Tunde Okafor',
      items: [{ desc: 'WAEC Mathematics — 8 sessions (October)', qty: 8, rate: 1875 }],
      status: 'paid', issuedAt: '2026-10-01', dueAt: '2026-10-07', note: 'Thank you!',
    },
    {
      id: 'inv_1002', studentId: 'stu_2', studentName: 'Zainab Musa',
      items: [{ desc: 'Physics — 6 sessions (October)', qty: 6, rate: 3000 }],
      status: 'unpaid', issuedAt: '2026-10-02', dueAt: '2026-10-09', note: '',
    },
  ],
  quizzes: [
    {
      id: 'quiz_1', title: 'Algebra: Simultaneous Equations', subject: 'Mathematics',
      source: 'scratch',
      questions: [
        { id: 'q1', type: 'mcq', prompt: 'Solve: 2x + 3y = 12, 4x − y = 5. What is x?', options: ['1.5', '2', '2.5', '3'], answer: 1 },
        { id: 'q2', type: 'mcq', prompt: 'How many solutions does a consistent independent pair have?', options: ['0', '1', 'Infinite', '2'], answer: 1 },
        { id: 'q3', type: 'short', prompt: 'State the substitution method in one sentence.', answer: '' },
      ],
    },
  ],
  materials: [
    { id: 'mat_1', title: 'Simultaneous Equations — Notes.pdf', kind: 'pdf', text: 'Simultaneous equations can be solved by substitution or elimination. The elimination method removes one variable by adding or subtracting the equations. The substitution method solves one equation for a variable and substitutes into the other. A consistent independent system has exactly one solution.' },
    { id: 'mat_2', title: "Newton's Laws — Summary.docx", kind: 'doc', text: "Newton's first law: an object stays at rest or in uniform motion unless acted on by a net force. Second law: F = ma. Third law: every action has an equal and opposite reaction." },
  ],
  meetings: [],
  meetingSettings: {
    // 'own' uses the tutor's paid account email; 'hosted' uses a TutorDesk-hosted room.
    hostMode: 'hosted',
    ownAccountEmail: '',
    defaultProvider: 'meet', // 'meet' | 'zoom'
  },
});

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw);
  } catch {
    const s = seed();
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
    return s;
  }
}

function write(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  // notify listeners in the same tab
  window.dispatchEvent(new CustomEvent('tutordesk:change'));
  return state;
}

export const store = {
  get: () => read(),
  set: (patch) => write({ ...read(), ...patch }),
  reset: () => write(seed()),

  // ---- brand ----
  getBrand: () => read().brand,
  setBrand: (brand) => {
    const s = read();
    s.brand = { ...s.brand, ...brand };
    return write(s);
  },

  // ---- students ----
  getStudents: () => read().students,

  // ---- invoices ----
  getInvoices: () => read().invoices,
  getInvoice: (id) => read().invoices.find((i) => i.id === id),
  saveInvoice: (invoice) => {
    const s = read();
    const idx = s.invoices.findIndex((i) => i.id === invoice.id);
    if (idx >= 0) s.invoices[idx] = invoice;
    else s.invoices.unshift(invoice);
    return write(s);
  },
  deleteInvoice: (id) => {
    const s = read();
    s.invoices = s.invoices.filter((i) => i.id !== id);
    return write(s);
  },

  // ---- quizzes ----
  getQuizzes: () => read().quizzes,
  getQuiz: (id) => read().quizzes.find((q) => q.id === id),
  saveQuiz: (quiz) => {
    const s = read();
    const idx = s.quizzes.findIndex((q) => q.id === quiz.id);
    if (idx >= 0) s.quizzes[idx] = quiz;
    else s.quizzes.unshift(quiz);
    return write(s);
  },
  deleteQuiz: (id) => {
    const s = read();
    s.quizzes = s.quizzes.filter((q) => q.id !== id);
    return write(s);
  },

  // ---- materials ----
  getMaterials: () => read().materials,
  getMaterial: (id) => read().materials.find((m) => m.id === id),
  saveMaterial: (mat) => {
    const s = read();
    const idx = s.materials.findIndex((m) => m.id === mat.id);
    if (idx >= 0) s.materials[idx] = mat;
    else s.materials.unshift(mat);
    return write(s);
  },

  // ---- meetings ----
  getMeetings: () => read().meetings,
  saveMeeting: (m) => {
    const s = read();
    s.meetings.unshift(m);
    return write(s);
  },
  getMeetingSettings: () => read().meetingSettings,
  setMeetingSettings: (patch) => {
    const s = read();
    s.meetingSettings = { ...s.meetingSettings, ...patch };
    return write(s);
  },
};

// tiny id helper
export const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// naira formatter
export const naira = (n) =>
  '₦' + Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 });
