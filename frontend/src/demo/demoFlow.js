// End-to-end user story across the functional pages.
export const demoFlow = [
  { key:'setup', title:'Tutor home', caption:'Setup checklist after sign-in.', path:'/portal/view/setup-checklist-home-variant' },
  { key:'branding', title:'Brand setup', caption:'Add logo → colours auto-extracted (or set manually).', path:'/portal/view/branding-settings' },
  { key:'add-student', title:'Add a student', caption:'Register a student and link the parent.', path:'/portal/view/add-edit-student-desktop' },
  { key:'onboarding', title:'Student onboarding form', caption:'Profile, subjects and goals.', path:'/portal/view/student-onboarding-form-desktop' },
  { key:'meeting', title:'Create class link', caption:'Generate a Meet/Zoom link.', path:'/portal/view/meeting-generator' },
  { key:'schedule', title:"Today's schedule", caption:"The day's classes.", path:'/portal/schedule' },
  { key:'live', title:'Live classroom', caption:'Embedded call: video, chat, whiteboard.', path:'/portal/view/live-classroom-desktop' },
  { key:'post', title:'Post-class wrap', caption:'Attendance and notes.', path:'/portal/view/classroom-post-class-wrap' },
  { key:'quiz', title:'Quiz maker', caption:'Build from a material or scratch.', path:'/portal/view/quiz-maker' },
  { key:'invoice', title:'Invoice maker', caption:'Branded invoice, saved.', path:'/portal/view/invoice-maker' },
  { key:'google', title:'Google Docs / Slides', caption:'Embed learning materials.', path:'/portal/view/google-embed' },
  { key:'report', title:'Monthly report', caption:'Progress report for the parent.', path:'/portal/view/monthly-report-generator-desktop' },
  { key:'parent', title:'Parent portal home', caption:'The parent side.', path:'/portal/view/parent-portal-home' },
];
export const nextInFlow = demoFlow.reduce((a,s,i)=>{ if(i<demoFlow.length-1)a[s.path]=demoFlow[i+1].path; return a; },{});
export const allPagesByGroup = [
  { group:'Functional tools', pages:[
    { label:'Brand setup', path:'/portal/view/branding-settings' },
    { label:'Invoice maker', path:'/portal/view/invoice-maker' },
    { label:'Quiz maker', path:'/portal/view/quiz-maker' },
    { label:'Create class link', path:'/portal/view/meeting-generator' },
    { label:'Live classroom', path:'/portal/view/live-classroom-desktop' },
    { label:'Google Docs/Slides embed', path:'/portal/view/google-embed' },
  ]},
  { group:'Students', pages:[
    { label:'Add / edit student', path:'/portal/view/add-edit-student-desktop' },
    { label:'Student onboarding form', path:'/portal/view/student-onboarding-form-desktop' },
    { label:'Students directory', path:'/portal/view/flagged-students-directory-view' },
  ]},
  { group:'Classes', pages:[
    { label:'My schedule', path:'/portal/schedule' },
    { label:'Post-class wrap', path:'/portal/view/classroom-post-class-wrap' },
  ]},
  { group:'Payments & reports', pages:[
    { label:'Payments & invoices', path:'/portal/view/portal-payments-invoices' },
    { label:'Monthly report', path:'/portal/view/monthly-report-generator-desktop' },
    { label:'Reports & insights', path:'/portal/view/reports-insights-desktop' },
  ]},
  { group:'Parent portal', pages:[
    { label:'Parent portal home', path:'/portal/view/parent-portal-home' },
    { label:'Progress reports', path:'/portal/view/portal-progress-reports' },
  ]},
];
