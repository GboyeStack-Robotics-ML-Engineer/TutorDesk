import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { PortalLayout } from './components/layout/PortalLayout/PortalLayout';
import { MySchedule } from './pages/Portal/MySchedule/MySchedule';
import { generatedRoutes } from './pages/Generated/GeneratedRoutes';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Authenticated Portal Routes */}
      <Route path="/portal" element={<PortalLayout />}>
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
    </Routes>
  );
}

export default App;
