import React from 'react';
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
import { ParentPortalHome } from './pages/Generated/ParentPortalHome';
import { PortalProgressReports } from './pages/Generated/PortalProgressReports';
import { PortalContactTutor1 } from './pages/Generated/PortalContactTutor1';
import { PortalPaymentsInvoices } from './pages/Generated/PortalPaymentsInvoices';

function App() {
  return (
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
  );
}

export default App;
