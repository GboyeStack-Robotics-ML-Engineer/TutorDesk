// Demo flow configuration for TutorDesk.
//
// This defines the end-to-end user story as an ordered list of real pages that
// already exist in the app. The DemoFlowGuide component reads this list and
// renders a floating "Next step" control, so the whole story can be walked
// (and screenshotted) by clicking through — without modifying the 52 page files.
//
// Each step maps a human-readable story beat to an actual route.

export const demoFlow = [
  {
    key: 'setup',
    title: 'Tutor home / setup checklist',
    caption: 'The tutor lands here after signing in.',
    path: '/portal/view/setup-checklist-home-variant',
  },
  {
    key: 'add-student',
    title: 'Add a student',
    caption: 'Tutor registers a new student and links the parent.',
    path: '/portal/view/add-edit-student-desktop',
  },
  {
    key: 'onboarding-form',
    title: 'Student onboarding form',
    caption: 'The profile, subjects and goals the parent completes.',
    path: '/portal/view/student-onboarding-form-desktop',
  },
  {
    key: 'schedule',
    title: 'Schedule a class',
    caption: 'Tutor books the class and generates the link.',
    path: '/portal/view/create-edit-class-desktop',
  },
  {
    key: 'my-schedule',
    title: "Today's schedule",
    caption: "The day's classes, times and student count.",
    path: '/portal/schedule',
  },
  {
    key: 'classroom',
    title: 'Classroom / post-class wrap',
    caption: 'Attendance and progress notes after the class.',
    path: '/portal/view/classroom-post-class-wrap',
  },
  {
    key: 'invoice',
    title: 'Create an invoice',
    caption: 'Tutor bills the parent for the month.',
    path: '/portal/view/create-edit-invoice-desktop',
  },
  {
    key: 'record-payment',
    title: 'Record a payment',
    caption: 'Payment is logged and reconciled.',
    path: '/portal/view/record-payment-desktop',
  },
  {
    key: 'report',
    title: 'Monthly report',
    caption: 'The progress report sent to the parent.',
    path: '/portal/view/monthly-report-generator-desktop',
  },
  {
    key: 'parent-portal',
    title: 'Parent portal home',
    caption: 'What the parent sees on their side.',
    path: '/portal/view/parent-portal-home',
  },
];

// All pages, grouped, for the demo index page (so every screen is reachable).
export const allPagesByGroup = [
  {
    group: 'Auth & onboarding',
    pages: [
      { label: 'Splash / landing', path: '/' },
      { label: 'Login', path: '/login' },
      { label: 'Sign up', path: '/signup' },
      { label: 'Forgot password', path: '/forgot-password' },
      { label: 'Reset password', path: '/reset-password' },
      { label: 'Verification (email/phone)', path: '/portal/view/verification-email-phone' },
      { label: 'Onboarding availability', path: '/portal/view/onboarding-availability-setup' },
      { label: 'Setup checklist (home)', path: '/portal/view/setup-checklist-home-variant' },
    ],
  },
  {
    group: 'Students',
    pages: [
      { label: 'Add / edit student', path: '/portal/view/add-edit-student-desktop' },
      { label: 'Student onboarding form', path: '/portal/view/student-onboarding-form-desktop' },
      { label: 'Flagged students directory', path: '/portal/view/flagged-students-directory-view' },
      { label: 'Diagnostic assessment', path: '/portal/view/diagnostic-assessment-entry-desktop' },
    ],
  },
  {
    group: 'Classes & classroom',
    pages: [
      { label: 'Create / edit class', path: '/portal/view/create-edit-class-desktop' },
      { label: 'My schedule', path: '/portal/schedule' },
      { label: 'Reschedule / cancel class', path: '/portal/view/reschedule-cancel-class-desktop' },
      { label: 'Classroom post-class wrap', path: '/portal/view/classroom-post-class-wrap' },
    ],
  },
  {
    group: 'Payments',
    pages: [
      { label: 'Create / edit invoice', path: '/portal/view/create-edit-invoice-desktop' },
      { label: 'Invoice detail', path: '/portal/view/invoice-detail-desktop' },
      { label: 'Record payment', path: '/portal/view/record-payment-desktop' },
      { label: 'Payments & invoices (portal)', path: '/portal/view/portal-payments-invoices' },
      { label: 'Subscriptions & plans', path: '/portal/view/subscriptions-plans-desktop' },
    ],
  },
  {
    group: 'Materials & lessons',
    pages: [
      { label: 'Materials library', path: '/portal/view/materials-library-desktop' },
      { label: 'Material viewer', path: '/portal/view/material-viewer-desktop' },
      { label: 'Lesson templates library', path: '/portal/view/lesson-templates-library-desktop' },
      { label: 'Lesson template editor', path: '/portal/view/lesson-template-editor-desktop' },
      { label: 'Quiz builder', path: '/portal/view/quiz-builder-desktop' },
      { label: 'AI prompt library', path: '/portal/view/ai-prompt-library-desktop' },
    ],
  },
  {
    group: 'Reports & insights',
    pages: [
      { label: 'Monthly report generator', path: '/portal/view/monthly-report-generator-desktop' },
      { label: 'Reports & insights', path: '/portal/view/reports-insights-desktop' },
      { label: 'Report detail (income)', path: '/portal/view/report-detail-income-analysis' },
    ],
  },
  {
    group: 'Communication',
    pages: [
      { label: 'Messages', path: '/portal/view/messages-desktop' },
      { label: 'Notifications center', path: '/portal/view/notifications-center-desktop' },
      { label: 'Global search results', path: '/portal/view/global-search-results-desktop' },
    ],
  },
  {
    group: 'Parent portal',
    pages: [
      { label: 'Parent portal home', path: '/portal/view/parent-portal-home' },
      { label: 'Progress reports', path: '/portal/view/portal-progress-reports' },
      { label: 'Contact tutor', path: '/portal/view/portal-contact-tutor-1' },
    ],
  },
  {
    group: 'Settings',
    pages: [
      { label: 'Settings hub', path: '/portal/view/settings-hub-desktop' },
      { label: 'Profile & bio', path: '/portal/view/settings-profile-bio' },
      { label: 'Account & security', path: '/portal/view/settings-account-security' },
      { label: 'Payment details', path: '/portal/view/settings-payment-details' },
      { label: 'Automation rules', path: '/portal/view/settings-automation-rules' },
      { label: 'Communication hours', path: '/portal/view/settings-communication-hours' },
      { label: 'Portal management', path: '/portal/view/settings-portal-management' },
      { label: 'SOPs & procedures', path: '/portal/view/settings-sops-procedures' },
      { label: 'Terms of service', path: '/portal/view/settings-terms-of-service' },
      { label: 'Data sync preferences', path: '/portal/view/settings-data-sync-preferences' },
    ],
  },
];
