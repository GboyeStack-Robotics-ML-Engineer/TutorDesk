import React from 'react';
import { useNavigate } from 'react-router-dom';
import { allPagesByGroup, demoFlow } from './demoFlow';
export const DemoIndex = () => {
  const navigate = useNavigate();
  return (
    <div style={{fontFamily:"'Inter',sans-serif",color:'#0f172a',paddingBottom:40}}>
      <h1 style={{fontSize:24,fontWeight:700,margin:0,color:'#005248'}}>TutorDesk — demo map</h1>
      <p style={{fontSize:14,color:'#64748b',marginTop:6,marginBottom:24}}>The guided story is at the top. Functional tools are grouped first.</p>
      <section style={{marginBottom:32}}>
        <h2 style={sh}>Guided user story (in order)</h2>
        <div style={fg}>{demoFlow.map((s,i)=>(
          <button key={s.key} onClick={()=>navigate(s.path)} style={fc}>
            <span style={fn}>{i+1}</span>
            <span style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
              <span style={{fontSize:13.5,fontWeight:600}}>{s.title}</span>
              <span style={{fontSize:11.5,color:'#64748b',marginTop:2}}>{s.caption}</span>
            </span>
          </button>))}
        </div>
      </section>
      {allPagesByGroup.map((g)=>(
        <section key={g.group} style={{marginBottom:24}}>
          <h2 style={sh}>{g.group}</h2>
          <div style={pg}>{g.pages.map((p)=>(
            <button key={p.path} onClick={()=>navigate(p.path)} style={pc}>{p.label}</button>))}
          </div>
        </section>))}
    </div>
  );
};
const sh={fontSize:12,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:12};
const fg={display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:10};
const fc={display:'flex',alignItems:'center',gap:12,padding:'12px 14px',border:'1px solid #e2e8f0',borderRadius:12,background:'#fff',cursor:'pointer',textAlign:'left'};
const fn={flexShrink:0,width:26,height:26,borderRadius:'50%',background:'#005248',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700};
const pg={display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8};
const pc={padding:'10px 14px',border:'1px solid #e2e8f0',borderRadius:9,background:'#fff',cursor:'pointer',fontSize:13,fontWeight:500,color:'#334155',textAlign:'left'};
