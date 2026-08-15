import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { demoFlow, nextInFlow } from './demoFlow';

const PRIMARY_LABELS = ['save','continue','next','add student','create','confirm','send','generate','schedule','save invoice','save quiz','save branding','generate link','complete','proceed','submit'];

export const DemoFlowGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [minimized, setMinimized] = useState(false);
  const idx = demoFlow.findIndex((s) => location.pathname === s.path);
  const onFlow = idx !== -1;
  const current = onFlow ? demoFlow[idx] : null;

  useEffect(() => {
    if (!onFlow) return;
    const target = nextInFlow[location.pathname];
    if (!target) return;
    const handler = (e) => {
      const btn = e.target.closest('button, a');
      if (!btn || btn.closest('[data-demo-guide]')) return;
      const label = (btn.textContent || '').trim().toLowerCase();
      if (!label) return;
      if (PRIMARY_LABELS.some((l) => label === l || label.startsWith(l) || label.includes(l))) {
        // let the page's own handler run (save), then advance
        setTimeout(() => navigate(target), 400);
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [location.pathname, onFlow, navigate]);

  if (location.pathname === '/portal/demo') return null;
  const go = (i) => { if (i>=0 && i<demoFlow.length) navigate(demoFlow[i].path); };

  if (minimized) return (
    <button data-demo-guide onClick={() => setMinimized(false)} style={pill}>
      <span className="material-symbols-outlined" style={{fontSize:18}}>play_arrow</span> Demo flow
    </button>
  );

  return (
    <div data-demo-guide style={wrap}>
      <div style={hdr}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span className="material-symbols-outlined" style={{fontSize:18,color:'#005248'}}>route</span>
          <span style={{fontWeight:700,fontSize:13,color:'#0f172a'}}>User story flow</span>
        </div>
        <div style={{display:'flex',gap:4}}>
          <button data-demo-guide onClick={() => navigate('/portal/demo')} style={ico} title="All pages"><span className="material-symbols-outlined" style={{fontSize:18}}>grid_view</span></button>
          <button data-demo-guide onClick={() => setMinimized(true)} style={ico} title="Minimize"><span className="material-symbols-outlined" style={{fontSize:18}}>remove</span></button>
        </div>
      </div>
      {onFlow ? (<>
        <div style={meta}>Step {idx+1} of {demoFlow.length}</div>
        <div style={ttl}>{current.title}</div>
        <div style={cap}>{current.caption}</div>
        <div style={track}><div style={{...fill,width:`${((idx+1)/demoFlow.length)*100}%`}} /></div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button data-demo-guide onClick={() => go(idx-1)} disabled={idx===0} style={{...btn,opacity:idx===0?0.4:1}}><span className="material-symbols-outlined" style={{fontSize:16}}>arrow_back</span> Prev</button>
          <button data-demo-guide onClick={() => go(idx+1)} disabled={idx===demoFlow.length-1} style={{...btnP,opacity:idx===demoFlow.length-1?0.4:1}}>Next <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_forward</span></button>
        </div>
      </>) : (<>
        <div style={cap}>Off the guided path. Restart or open the index.</div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button data-demo-guide onClick={() => go(0)} style={btnP}><span className="material-symbols-outlined" style={{fontSize:16}}>play_arrow</span> Start</button>
          <button data-demo-guide onClick={() => navigate('/portal/demo')} style={btn}>All pages</button>
        </div>
      </>)}
    </div>
  );
};
const wrap={position:'fixed',right:20,bottom:20,width:300,background:'#fff',border:'1px solid #e5e7eb',borderRadius:14,boxShadow:'0 8px 30px rgba(0,0,0,0.12)',padding:16,zIndex:9999,fontFamily:"'Inter',sans-serif"};
const hdr={display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12};
const meta={fontSize:11,color:'#94a3b8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'};
const ttl={fontSize:15,fontWeight:700,color:'#0f172a',marginTop:2};
const cap={fontSize:12.5,color:'#64748b',marginTop:4,lineHeight:1.5};
const track={height:4,background:'#eef2f7',borderRadius:4,marginTop:12,overflow:'hidden'};
const fill={height:'100%',background:'#005248',borderRadius:4,transition:'width 0.3s ease'};
const btn={flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:4,padding:'8px 10px',borderRadius:9,border:'1px solid #e2e8f0',background:'#fff',color:'#334155',fontSize:12.5,fontWeight:600,cursor:'pointer'};
const btnP={...btn,background:'#005248',color:'#fff',border:'1px solid #005248'};
const ico={display:'flex',alignItems:'center',justifyContent:'center',width:26,height:26,borderRadius:7,border:'none',background:'#f1f5f9',color:'#475569',cursor:'pointer'};
const pill={position:'fixed',right:20,bottom:20,zIndex:9999,display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:999,border:'none',background:'#005248',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',boxShadow:'0 6px 20px rgba(0,82,72,0.35)',fontFamily:"'Inter',sans-serif"};
