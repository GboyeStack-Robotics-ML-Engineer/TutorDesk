
import React from 'react';

// Lazy-loaded (React.lazy + Suspense boundary in App.jsx) rather than
// imported statically — this is most of the app's page count in one
// place, and eagerly importing all of them put every settings/admin
// page a tutor might never visit into the one bundle everyone downloads
// on first load (833KB, per Vite's own build-time warning). Each entry
// below becomes its own chunk, fetched only when that route is visited.
const InvoiceMaker = React.lazy(() => import('./InvoiceMaker').then((m) => ({ default: m.InvoiceMaker })));
const QuizMaker = React.lazy(() => import('./QuizMaker').then((m) => ({ default: m.QuizMaker })));
const BrandSetup = React.lazy(() => import('./BrandSetup').then((m) => ({ default: m.BrandSetup })));
const MeetingGenerator = React.lazy(() => import('./MeetingGenerator').then((m) => ({ default: m.MeetingGenerator })));
const GoogleEmbed = React.lazy(() => import('./GoogleEmbed').then((m) => ({ default: m.GoogleEmbed })));
const LiveClassroomDesktop = React.lazy(() => import('./LiveClassroomDesktop').then((m) => ({ default: m.LiveClassroomDesktop })));
const AddEditStudentDesktop = React.lazy(() => import('./AddEditStudentDesktop').then((m) => ({ default: m.AddEditStudentDesktop })));
const AiPromptLibraryDesktop = React.lazy(() => import('./AiPromptLibraryDesktop').then((m) => ({ default: m.AiPromptLibraryDesktop })));
const ClassroomPostClassWrap = React.lazy(() => import('./ClassroomPostClassWrap').then((m) => ({ default: m.ClassroomPostClassWrap })));
const CreateEditClassDesktop = React.lazy(() => import('./CreateEditClassDesktop').then((m) => ({ default: m.CreateEditClassDesktop })));
const DiagnosticAssessmentEntryDesktop = React.lazy(() => import('./DiagnosticAssessmentEntryDesktop').then((m) => ({ default: m.DiagnosticAssessmentEntryDesktop })));
const FlaggedStudentsDirectoryView = React.lazy(() => import('./FlaggedStudentsDirectoryView').then((m) => ({ default: m.FlaggedStudentsDirectoryView })));
const GlobalSearchResultsDesktop = React.lazy(() => import('./GlobalSearchResultsDesktop').then((m) => ({ default: m.GlobalSearchResultsDesktop })));
const InvoiceDetailDesktop = React.lazy(() => import('./InvoiceDetailDesktop').then((m) => ({ default: m.InvoiceDetailDesktop })));
const LessonTemplatesLibraryDesktop = React.lazy(() => import('./LessonTemplatesLibraryDesktop').then((m) => ({ default: m.LessonTemplatesLibraryDesktop })));
const LessonTemplateEditorDesktop = React.lazy(() => import('./LessonTemplateEditorDesktop').then((m) => ({ default: m.LessonTemplateEditorDesktop })));
const MaterialsLibraryDesktop = React.lazy(() => import('./MaterialsLibraryDesktop').then((m) => ({ default: m.MaterialsLibraryDesktop })));
const MaterialViewerDesktop = React.lazy(() => import('./MaterialViewerDesktop').then((m) => ({ default: m.MaterialViewerDesktop })));
const MessagesDesktop = React.lazy(() => import('./MessagesDesktop').then((m) => ({ default: m.MessagesDesktop })));
const MonthlyReportGeneratorDesktop = React.lazy(() => import('./MonthlyReportGeneratorDesktop').then((m) => ({ default: m.MonthlyReportGeneratorDesktop })));
const NotificationsCenterDesktop = React.lazy(() => import('./NotificationsCenterDesktop').then((m) => ({ default: m.NotificationsCenterDesktop })));
const OnboardingAvailabilitySetup = React.lazy(() => import('./OnboardingAvailabilitySetup').then((m) => ({ default: m.OnboardingAvailabilitySetup })));
const ParentPortalHome = React.lazy(() => import('./ParentPortalHome').then((m) => ({ default: m.ParentPortalHome })));
const PortalContactTutor1 = React.lazy(() => import('./PortalContactTutor1').then((m) => ({ default: m.PortalContactTutor1 })));
const PortalPaymentsInvoices = React.lazy(() => import('./PortalPaymentsInvoices').then((m) => ({ default: m.PortalPaymentsInvoices })));
const PortalProgressReports = React.lazy(() => import('./PortalProgressReports').then((m) => ({ default: m.PortalProgressReports })));
const RecordPaymentDesktop = React.lazy(() => import('./RecordPaymentDesktop').then((m) => ({ default: m.RecordPaymentDesktop })));
const ReportsInsightsDesktop = React.lazy(() => import('./ReportsInsightsDesktop').then((m) => ({ default: m.ReportsInsightsDesktop })));
const ReportDetailIncomeAnalysis = React.lazy(() => import('./ReportDetailIncomeAnalysis').then((m) => ({ default: m.ReportDetailIncomeAnalysis })));
const RescheduleCancelClassDesktop = React.lazy(() => import('./RescheduleCancelClassDesktop').then((m) => ({ default: m.RescheduleCancelClassDesktop })));
const SettingsAccountSecurity = React.lazy(() => import('./SettingsAccountSecurity').then((m) => ({ default: m.SettingsAccountSecurity })));
const SettingsAutomationRules = React.lazy(() => import('./SettingsAutomationRules').then((m) => ({ default: m.SettingsAutomationRules })));
const SettingsCommunicationHours = React.lazy(() => import('./SettingsCommunicationHours').then((m) => ({ default: m.SettingsCommunicationHours })));
const SettingsDataSyncPreferences = React.lazy(() => import('./SettingsDataSyncPreferences').then((m) => ({ default: m.SettingsDataSyncPreferences })));
const SettingsHubDesktop = React.lazy(() => import('./SettingsHubDesktop').then((m) => ({ default: m.SettingsHubDesktop })));
const SettingsPaymentDetails = React.lazy(() => import('./SettingsPaymentDetails').then((m) => ({ default: m.SettingsPaymentDetails })));
const SettingsPortalManagement = React.lazy(() => import('./SettingsPortalManagement').then((m) => ({ default: m.SettingsPortalManagement })));
const SettingsProfileBio = React.lazy(() => import('./SettingsProfileBio').then((m) => ({ default: m.SettingsProfileBio })));
const SettingsReminderRulesAdmin = React.lazy(() => import('./SettingsReminderRulesAdmin').then((m) => ({ default: m.SettingsReminderRulesAdmin })));
const SettingsSopsProcedures = React.lazy(() => import('./SettingsSopsProcedures').then((m) => ({ default: m.SettingsSopsProcedures })));
const SettingsTermsOfService = React.lazy(() => import('./SettingsTermsOfService').then((m) => ({ default: m.SettingsTermsOfService })));
const SetupChecklistHomeVariant = React.lazy(() => import('./SetupChecklistHomeVariant').then((m) => ({ default: m.SetupChecklistHomeVariant })));
const SplashLoadingState = React.lazy(() => import('./SplashLoadingState').then((m) => ({ default: m.SplashLoadingState })));
const StudentOnboardingFormDesktop = React.lazy(() => import('./StudentOnboardingFormDesktop').then((m) => ({ default: m.StudentOnboardingFormDesktop })));
const SubscriptionsPlansDesktop = React.lazy(() => import('./SubscriptionsPlansDesktop').then((m) => ({ default: m.SubscriptionsPlansDesktop })));
const TheOrganizedDesk = React.lazy(() => import('./TheOrganizedDesk').then((m) => ({ default: m.TheOrganizedDesk })));
const VerificationEmailPhone = React.lazy(() => import('./VerificationEmailPhone').then((m) => ({ default: m.VerificationEmailPhone })));

export const generatedRoutes = [
  { path: "/view/add-edit-student-desktop", component: AddEditStudentDesktop },
  { path: "/view/ai-prompt-library-desktop", component: AiPromptLibraryDesktop },
  { path: "/view/classroom-post-class-wrap", component: ClassroomPostClassWrap },
  { path: "/view/create-edit-class-desktop", component: CreateEditClassDesktop },
  { path: "/view/diagnostic-assessment-entry-desktop", component: DiagnosticAssessmentEntryDesktop },
  { path: "/view/flagged-students-directory-view", component: FlaggedStudentsDirectoryView },
  { path: "/view/global-search-results-desktop", component: GlobalSearchResultsDesktop },
  { path: "/view/invoice-detail-desktop", component: InvoiceDetailDesktop },
  { path: "/view/lesson-templates-library-desktop", component: LessonTemplatesLibraryDesktop },
  { path: "/view/lesson-template-editor-desktop", component: LessonTemplateEditorDesktop },
  { path: "/view/materials-library-desktop", component: MaterialsLibraryDesktop },
  { path: "/view/material-viewer-desktop", component: MaterialViewerDesktop },
  { path: "/view/messages-desktop", component: MessagesDesktop },
  { path: "/view/monthly-report-generator-desktop", component: MonthlyReportGeneratorDesktop },
  { path: "/view/notifications-center-desktop", component: NotificationsCenterDesktop },
  { path: "/view/onboarding-availability-setup", component: OnboardingAvailabilitySetup },
  { path: "/view/parent-portal-home", component: ParentPortalHome },
  { path: "/view/portal-contact-tutor-1", component: PortalContactTutor1 },
  { path: "/view/portal-payments-invoices", component: PortalPaymentsInvoices },
  { path: "/view/portal-progress-reports", component: PortalProgressReports },
  { path: "/view/record-payment-desktop", component: RecordPaymentDesktop },
  { path: "/view/reports-insights-desktop", component: ReportsInsightsDesktop },
  { path: "/view/report-detail-income-analysis", component: ReportDetailIncomeAnalysis },
  { path: "/view/reschedule-cancel-class-desktop", component: RescheduleCancelClassDesktop },
  { path: "/view/settings-account-security", component: SettingsAccountSecurity },
  { path: "/view/settings-automation-rules", component: SettingsAutomationRules },
  { path: "/view/settings-communication-hours", component: SettingsCommunicationHours },
  { path: "/view/settings-data-sync-preferences", component: SettingsDataSyncPreferences },
  { path: "/view/settings-hub-desktop", component: SettingsHubDesktop },
  { path: "/view/settings-payment-details", component: SettingsPaymentDetails },
  { path: "/view/settings-portal-management", component: SettingsPortalManagement },
  { path: "/view/settings-profile-bio", component: SettingsProfileBio },
  { path: "/view/settings-reminder-rules-admin", component: SettingsReminderRulesAdmin },
  { path: "/view/settings-sops-procedures", component: SettingsSopsProcedures },
  { path: "/view/settings-terms-of-service", component: SettingsTermsOfService },
  { path: "/view/setup-checklist-home-variant", component: SetupChecklistHomeVariant },
  { path: "/view/splash-loading-state", component: SplashLoadingState },
  { path: "/view/student-onboarding-form-desktop", component: StudentOnboardingFormDesktop },
  { path: "/view/subscriptions-plans-desktop", component: SubscriptionsPlansDesktop },
  { path: "/view/the-organized-desk", component: TheOrganizedDesk },
  { path: "/view/verification-email-phone", component: VerificationEmailPhone },

  { path: "/view/invoice-maker", component: InvoiceMaker },
  { path: "/view/quiz-maker", component: QuizMaker },
  { path: "/view/branding-settings", component: BrandSetup },
  { path: "/view/meeting-generator", component: MeetingGenerator },
  { path: "/view/google-embed", component: GoogleEmbed },
  { path: "/view/live-classroom-desktop", component: LiveClassroomDesktop },
];
