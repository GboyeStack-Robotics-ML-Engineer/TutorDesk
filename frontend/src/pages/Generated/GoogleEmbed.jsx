import React, { useState } from 'react';

// Embed Google Docs / Slides / Sheets directly.
// Real: pasting a public Google share/embed URL renders it in an iframe.
// Private docs need Google auth — noted in the UI.

const samples = [
  { label: 'Lesson slides (Slides)', url: 'https://docs.google.com/presentation/d/e/2PACX-1vT_example/embed' },
  { label: 'Worksheet (Docs)', url: 'https://docs.google.com/document/d/e/example/pub?embedded=true' },
];

function toEmbed(url) {
  if (!url) return '';
  // best-effort: turn common share links into embeddable ones
  if (url.includes('/presentation/')) {
    return url.replace(/\/(edit|pub).*$/, '/embed');
  }
  if (url.includes('/document/')) {
    return url.includes('embedded=true') ? url : url.replace(/\/(edit|pub).*$/, '/pub?embedded=true');
  }
  if (url.includes('/spreadsheets/')) {
    return url.replace(/\/(edit|pub).*$/, '/pubhtml?widget=true&headers=false');
  }
  return url;
}

export const GoogleEmbed = () => {
  const [input, setInput] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const load = () => setEmbedUrl(toEmbed(input.trim()));

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-space-5">
      <div>
        <h1 className="font-heading text-title-md text-ink-900">Google Docs & Slides</h1>
        <p className="font-caption text-caption text-ink-500">
          Embed a Google Doc, Slides or Sheet directly in your workspace.
        </p>
      </div>

      <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-3">
        <label className="font-label text-label text-ink-700">Paste a Google share link</label>
        <div className="flex gap-space-3">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="https://docs.google.com/…"
            className="flex-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
          <button onClick={load} className="flex items-center gap-2 bg-primary text-on-primary px-space-4 py-2 rounded-lg font-label text-label">
            <span className="material-symbols-outlined text-[18px]">preview</span> Embed
          </button>
        </div>
        <div className="flex flex-wrap gap-space-2">
          {samples.map((s) => (
            <button key={s.label} onClick={() => { setInput(s.url); setEmbedUrl(toEmbed(s.url)); }}
              className="font-caption text-caption text-primary bg-primary-container px-space-3 py-1 rounded-full">
              {s.label}
            </button>
          ))}
        </div>
        <p className="font-caption text-caption text-ink-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">info</span>
          The document must be shared publicly (or "anyone with link") to embed. Private files need Google sign-in.
        </p>
      </div>

      <div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden aspect-video">
        {embedUrl ? (
          <iframe title="Google embed" src={embedUrl} className="w-full h-full" frameBorder="0" allowFullScreen />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-ink-500 text-center">
            <span className="material-symbols-outlined text-[40px] mb-2">docs</span>
            <p className="font-caption text-caption">Your embedded document appears here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
