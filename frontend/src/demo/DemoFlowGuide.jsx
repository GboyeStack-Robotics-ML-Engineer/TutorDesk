import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { demoFlow } from './demoFlow';

// A floating control that walks the end-to-end user story. It reads demoFlow
// and lets you jump Prev/Next through the real pages, so the whole flow is
// clickable for a live demo or for capturing screenshots.
//
// It is mounted once in PortalLayout, so it appears on every portal page
// without touching the individual page files. Hidden on the demo index page.

export const DemoFlowGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [minimized, setMinimized] = useState(false);

  // Find current step index by matching the path.
  const idx = demoFlow.findIndex((s) => location.pathname === s.path);
  const onFlow = idx !== -1;
  const current = onFlow ? demoFlow[idx] : null;

  // Don't render on the demo index itself.
  if (location.pathname === '/portal/demo') return null;

  const go = (i) => {
    if (i < 0 || i >= demoFlow.length) return;
    navigate(demoFlow[i].path);
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        style={pillBtn}
        title="Show demo flow guide"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          play_arrow
        </span>
        Demo flow
      </button>
    );
  }

  return (
    <div style={wrap}>
      <div style={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 18, color: '#095D51' }}
          >
            route
          </span>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>
            User story flow
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => navigate('/portal/demo')} style={iconBtn} title="All pages index">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
          </button>
          <button onClick={() => setMinimized(true)} style={iconBtn} title="Minimize">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>remove</span>
          </button>
        </div>
      </div>

      {onFlow ? (
        <>
          <div style={stepMeta}>
            Step {idx + 1} of {demoFlow.length}
          </div>
          <div style={stepTitle}>{current.title}</div>
          <div style={stepCaption}>{current.caption}</div>

          <div style={progressTrack}>
            <div
              style={{
                ...progressFill,
                width: `${((idx + 1) / demoFlow.length) * 100}%`,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              style={{ ...navBtn, opacity: idx === 0 ? 0.4 : 1 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                arrow_back
              </span>
              Prev
            </button>
            <button
              onClick={() => go(idx + 1)}
              disabled={idx === demoFlow.length - 1}
              style={{ ...navBtnPrimary, opacity: idx === demoFlow.length - 1 ? 0.4 : 1 }}
            >
              Next step
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                arrow_forward
              </span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={stepCaption}>
            You're off the guided path. Jump back to the start of the user story,
            or open the full page index.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => go(0)} style={navBtnPrimary}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                play_arrow
              </span>
              Start flow
            </button>
            <button onClick={() => navigate('/portal/demo')} style={navBtn}>
              All pages
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const wrap = {
  position: 'fixed',
  right: 20,
  bottom: 20,
  width: 300,
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 14,
  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  padding: 16,
  zIndex: 9999,
  fontFamily: "'Inter', sans-serif",
};
const header = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
};
const stepMeta = { fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' };
const stepTitle = { fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 };
const stepCaption = { fontSize: 12.5, color: '#64748b', marginTop: 4, lineHeight: 1.5 };
const progressTrack = { height: 4, background: '#eef2f7', borderRadius: 4, marginTop: 12, overflow: 'hidden' };
const progressFill = { height: '100%', background: '#095D51', borderRadius: 4, transition: 'width 0.3s ease' };
const navBtn = {
  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
  padding: '8px 10px', borderRadius: 9, border: '1px solid #e2e8f0',
  background: '#fff', color: '#334155', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
};
const navBtnPrimary = {
  ...navBtn, background: '#095D51', color: '#fff', border: '1px solid #095D51',
};
const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 26, height: 26, borderRadius: 7, border: 'none', background: '#f1f5f9',
  color: '#475569', cursor: 'pointer',
};
const pillBtn = {
  position: 'fixed', right: 20, bottom: 20, zIndex: 9999,
  display: 'flex', alignItems: 'center', gap: 6,
  padding: '10px 16px', borderRadius: 999, border: 'none',
  background: '#095D51', color: '#fff', fontSize: 13, fontWeight: 600,
  cursor: 'pointer', boxShadow: '0 6px 20px rgba(9,93,81,0.35)',
  fontFamily: "'Inter', sans-serif",
};
