import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store, uid } from '../../lib/store';

// Functional quiz maker.
// Two ways to start:
//   1. From a material — we turn the material's text into starter questions
//      (simple sentence-based generation, fully client-side).
//   2. From scratch — start with one blank question.
// Add/edit/remove MCQ and short-answer questions, then save to localStorage.

function draftFromMaterial(text) {
  // naive but real: split into sentences, turn the most substantive ones into
  // fill-in / short questions and a couple of MCQs. Good enough for a demo seed.
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30);

  const qs = [];
  sentences.slice(0, 3).forEach((s, i) => {
    // make a short-answer by removing the last clause
    if (i === 0 && /=|law|method|force/i.test(s)) {
      qs.push({
        id: uid('q'),
        type: 'mcq',
        prompt: `Which statement is correct?`,
        options: [s, 'None of these', 'The opposite of the above', 'Cannot be determined'],
        answer: 0,
      });
    } else {
      const words = s.split(' ');
      const blankAt = Math.max(2, Math.floor(words.length * 0.7));
      const answer = words[blankAt] || '';
      words[blankAt] = '_____';
      qs.push({
        id: uid('q'),
        type: 'short',
        prompt: words.join(' '),
        answer,
      });
    }
  });
  if (qs.length === 0) {
    qs.push({ id: uid('q'), type: 'short', prompt: 'Summarise the key idea from the material.', answer: '' });
  }
  return qs;
}

export const QuizMaker = () => {
  const navigate = useNavigate();
  const materials = store.getMaterials();

  const [step, setStep] = useState('choose'); // choose | edit
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [questions, setQuestions] = useState([]);
  const [source, setSource] = useState('scratch');
  const [saved, setSaved] = useState(false);

  const startScratch = () => {
    setSource('scratch');
    setTitle('New quiz');
    setQuestions([{ id: uid('q'), type: 'mcq', prompt: '', options: ['', '', '', ''], answer: 0 }]);
    setStep('edit');
  };

  const startFromMaterial = (mat) => {
    setSource('material');
    setTitle(`Quiz — ${mat.title.replace(/\.[^.]+$/, '')}`);
    setQuestions(draftFromMaterial(mat.text));
    setStep('edit');
  };

  const setQ = (i, patch) => setQuestions((arr) => arr.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  const setOpt = (i, oi, val) =>
    setQuestions((arr) => arr.map((q, idx) => (idx === i ? { ...q, options: q.options.map((o, k) => (k === oi ? val : o)) } : q)));
  const addQ = (type) =>
    setQuestions((arr) => [...arr, type === 'mcq'
      ? { id: uid('q'), type: 'mcq', prompt: '', options: ['', '', '', ''], answer: 0 }
      : { id: uid('q'), type: 'short', prompt: '', answer: '' }]);
  const removeQ = (i) => setQuestions((arr) => arr.filter((_, idx) => idx !== i));

  const save = () => {
    const quiz = { id: uid('quiz'), title, subject, source, questions };
    store.saveQuiz(quiz);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (step === 'choose') {
    return (
      <div className="max-w-3xl mx-auto flex flex-col gap-space-5">
        <div>
          <h1 className="font-heading text-title-md text-ink-900">Quiz maker</h1>
          <p className="font-caption text-caption text-ink-500">Build a quiz from a material, or start from scratch.</p>
        </div>

        <button onClick={startScratch}
          className="flex items-center gap-space-4 bg-paper-0 border border-paper-200 rounded-xl p-space-5 hover:border-primary transition-colors text-left">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container">edit_note</span>
          </div>
          <div>
            <div className="font-label text-label text-ink-900">Start from scratch</div>
            <div className="font-caption text-caption text-ink-500">Write your own questions.</div>
          </div>
        </button>

        <div>
          <div className="font-label text-label text-ink-700 mb-space-3">Or generate from a material</div>
          <div className="flex flex-col gap-space-3">
            {materials.map((m) => (
              <button key={m.id} onClick={() => startFromMaterial(m)}
                className="flex items-center gap-space-4 bg-paper-0 border border-paper-200 rounded-xl p-space-4 hover:border-primary transition-colors text-left">
                <span className="material-symbols-outlined text-ink-500">
                  {m.kind === 'pdf' ? 'picture_as_pdf' : 'description'}
                </span>
                <div className="flex-1">
                  <div className="font-label text-label text-ink-900">{m.title}</div>
                  <div className="font-caption text-caption text-ink-500 line-clamp-1">{m.text.slice(0, 80)}…</div>
                </div>
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-space-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setStep('choose')} className="flex items-center gap-1 font-label text-label text-ink-700">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
        </button>
        <div className="flex items-center gap-space-3">
          {source === 'material' && (
            <span className="flex items-center gap-1 font-caption text-caption text-primary bg-primary-container px-space-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Generated from material
            </span>
          )}
          <button onClick={save} className="flex items-center gap-2 bg-primary text-on-primary px-space-4 py-2 rounded-lg font-label text-label">
            <span className="material-symbols-outlined text-[18px]">save</span> Save quiz
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-success-tint text-success-solid px-space-4 py-space-3 rounded-lg font-label text-label">
          <span className="material-symbols-outlined text-[18px]">check_circle</span> Quiz saved.
        </div>
      )}

      <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz title"
          className="font-heading text-title-sm text-ink-900 border-b border-paper-200 pb-2 focus:outline-none focus:border-primary" />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject"
          className="font-caption text-caption text-ink-500 focus:outline-none w-48" />
      </div>

      {questions.map((q, i) => (
        <div key={q.id} className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-3">
          <div className="flex items-center justify-between">
            <span className="font-label text-caption text-ink-500">Q{i + 1} · {q.type === 'mcq' ? 'Multiple choice' : 'Short answer'}</span>
            <button onClick={() => removeQ(i)} className="text-ink-500 hover:text-danger-solid">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
          <textarea value={q.prompt} onChange={(e) => setQ(i, { prompt: e.target.value })} rows={2} placeholder="Question prompt"
            className="w-full border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary resize-none" />

          {q.type === 'mcq' ? (
            <div className="flex flex-col gap-space-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className="flex items-center gap-space-3">
                  <input type="radio" name={`ans-${q.id}`} checked={q.answer === oi} onChange={() => setQ(i, { answer: oi })} />
                  <input value={opt} onChange={(e) => setOpt(i, oi, e.target.value)} placeholder={`Option ${oi + 1}`}
                    className="flex-1 border border-paper-300 rounded-lg px-space-3 py-1.5 font-body text-body focus:outline-none focus:border-primary" />
                  {q.answer === oi && <span className="font-caption text-caption text-success-solid">correct</span>}
                </label>
              ))}
            </div>
          ) : (
            <input value={q.answer} onChange={(e) => setQ(i, { answer: e.target.value })} placeholder="Model answer (optional)"
              className="w-full border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
          )}
        </div>
      ))}

      <div className="flex gap-space-3">
        <button onClick={() => addQ('mcq')} className="flex items-center gap-2 border border-paper-300 px-space-4 py-2 rounded-lg font-label text-label text-ink-700">
          <span className="material-symbols-outlined text-[18px]">add</span> MCQ
        </button>
        <button onClick={() => addQ('short')} className="flex items-center gap-2 border border-paper-300 px-space-4 py-2 rounded-lg font-label text-label text-ink-700">
          <span className="material-symbols-outlined text-[18px]">add</span> Short answer
        </button>
      </div>
    </div>
  );
};
