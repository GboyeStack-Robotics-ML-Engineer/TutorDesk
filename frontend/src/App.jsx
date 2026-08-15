import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';
import Splash from './pages/Splash';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { PortalLayout } from './components/layout/PortalLayout/PortalLayout';
import { MySchedule } from './pages/Portal/MySchedule/MySchedule';
import { generatedRoutes } from './pages/Generated/GeneratedRoutes';
import { DemoIndex } from './demo/DemoIndex';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes — wrapped in smooth page transitions */}
        <Route path="/" element={<PageTransition><Splash /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />

        {/* Authenticated Portal Routes */}
        <Route path="/portal" element={<PortalLayout />}>
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
      </Routes>
    </AnimatePresence>
  );
}

export default App;
