import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import { Login } from './pages/Login/Login';
import { ParentLogin } from './pages/ParentLogin/ParentLogin';
import { SignUp } from './pages/SignUp/SignUp';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { PortalLayout } from './components/layout/PortalLayout/PortalLayout';
import { ParentLayout } from './components/layout/ParentLayout/ParentLayout';
import { MySchedule } from './pages/Portal/MySchedule/MySchedule';
import { generatedRoutes } from './pages/Generated/GeneratedRoutes';
import { DemoIndex } from './demo/DemoIndex';
import { RequireAuth } from './components/RequireAuth';

// Lazy — same reasoning as GeneratedRoutes.jsx: these 4 pages are only
// reachable via a real parent/student login, not part of every visitor's
// first load.
const ParentPortalHome = React.lazy(() => import('./pages/Generated/ParentPortalHome').then((m) => ({ default: m.ParentPortalHome })));
const PortalProgressReports = React.lazy(() => import('./pages/Generated/PortalProgressReports').then((m) => ({ default: m.PortalProgressReports })));
const PortalContactTutor1 = React.lazy(() => import('./pages/Generated/PortalContactTutor1').then((m) => ({ default: m.PortalContactTutor1 })));
const PortalPaymentsInvoices = React.lazy(() => import('./pages/Generated/PortalPaymentsInvoices').then((m) => ({ default: m.PortalPaymentsInvoices })));

// Fallback for every lazy-loaded route above and in GeneratedRoutes.jsx —
// one Suspense boundary high in the tree covers all of them.
const RouteLoadingFallback = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <p className="text-body text-ink-500">Loading…</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/parent" element={<ParentLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Authenticated Portal Routes (tutor) */}
        <Route path="/portal" element={<RequireAuth allow={['tutor']}><PortalLayout /></RequireAuth>}>
          <Route path="demo" element={<DemoIndex />} />
          <Route path="schedule" element={<MySchedule />} />

          {/* Generated Views Routes (rendered inside PortalLayout) */}
          {generatedRoutes.map(({ path, component: Component }) => {
            // path in generatedRoutes is like "/view/some-page"
            // Since it's nested under "/portal", we want the final URL to be "/portal/view/some-page"
            // We can strip the leading slash to make it a valid nested route.
            const nestedPath = path.startsWith('/') ? path.substring(1) : path;
            return <Route key={path} path={nestedPath} element={<Component />} />;
          })}
        </Route>

        {/* Authenticated Portal Routes (parent/student) — same page content as
            the tutor-side preview under /portal/view/..., but only reachable
            here via a real parent/student login (see ParentLogin.jsx). */}
        <Route path="/parent" element={<RequireAuth allow={['parent', 'student']}><ParentLayout /></RequireAuth>}>
          <Route path="home" element={<ParentPortalHome />} />
          <Route path="progress-reports" element={<PortalProgressReports />} />
          <Route path="contact-tutor" element={<PortalContactTutor1 />} />
          <Route path="payments-invoices" element={<PortalPaymentsInvoices />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
