import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Materials library, wired to GET/POST /api/materials/.
//
// Scoped down from the original static mockup: that version had a fake
// folder-tree sidebar, fake file sizes, and fake offline-availability
// toggles with no real state behind any of it. This is a plain list +
// add-material form instead — real data, no decoration promising features
// (a real folder hierarchy, real file uploads/sizes, offline sync) that
// don't exist yet.

const KIND_ICON = { pdf: 'picture_as_pdf', doc: 'description' };

export const MaterialsLibraryDesktop = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('doc');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const load = () => {
    setLoading(true);
    api.materials
      .list({ pageSize: 200 })
      .then((data) => setMaterials(data?.results || []))
      .catch((err) => {
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load your materials.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const addMaterial = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setSaveError('');
    try {
      await api.materials.create({ title, kind, text });
      setTitle(''); setKind('doc'); setText('');
      setShowForm(false);
      load();
    } catch (err) {
      setSaveError(err instanceof NetworkError ? err.message : err.message || "Couldn't add this material.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-live-page="materials-library" className="flex flex-col gap-space-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-4">
        <div>
          <div className="flex items-center gap-space-2 text-ink-500 font-label text-label mb-space-1">
            <span>Library</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary font-bold">All Materials</span>
          </div>
          <h2 className="font-display-lg text-display-lg text-on-background">Materials Library</h2>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-primary text-on-primary hover:bg-primary-container transition-colors py-space-2 px-space-4 rounded-lg flex items-center justify-center gap-space-2 font-title-sm text-title-sm whitespace-nowrap self-start sm:self-auto border border-primary"
        >
          <span className="material-symbols-outlined">add</span>
          Add material
        </button>
      </div>

      {loadError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
          {loadError}
        </p>
      )}

      {showForm && (
        <form onSubmit={addMaterial} className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-3">
            <input
              value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required
              className="sm:col-span-2 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary"
            />
            <select value={kind} onChange={(e) => setKind(e.target.value)}
              className="border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary">
              <option value="doc">Document</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} rows={4}
            placeholder="Paste the material's text — used for viewing and for generating quiz questions."
            className="w-full border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary resize-none"
          />
          {saveError && <p role="alert" className="font-body text-body text-danger-solid">{saveError}</p>}
          <div className="flex gap-space-3">
            <button type="submit" disabled={saving}
              className="bg-primary text-on-primary px-space-4 py-2 rounded-lg font-label text-label disabled:opacity-60">
              {saving ? 'Saving…' : 'Save material'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="border border-paper-300 px-space-4 py-2 rounded-lg font-label text-label text-ink-700">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p className="font-caption text-caption text-ink-500">Loading materials…</p>}

      {!loading && materials.length === 0 && (
        <div className="bg-transparent border border-dashed border-outline-variant rounded-xl p-space-8 flex flex-col items-center justify-center text-ink-500 text-center">
          <span className="material-symbols-outlined text-[32px] mb-space-2">folder_open</span>
          <h4 className="font-title-sm text-title-sm">No materials yet</h4>
          <p className="font-caption text-caption mt-1 max-w-[280px]">Add a material to reuse it in the Quiz maker.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-4">
        {materials.map((m) => (
          <button
            key={m.id}
            onClick={() => navigate(`/portal/view/material-viewer-desktop?id=${m.id}`)}
            className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 elev-1 hover:border-primary-fixed/50 transition-colors text-left flex flex-col h-full"
          >
            <div className="flex items-start gap-space-3 mb-space-3">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low border border-paper-200 flex items-center justify-center shrink-0 text-ink-700">
                <span className="material-symbols-outlined text-[28px]">{KIND_ICON[m.kind] || 'description'}</span>
              </div>
              <div>
                <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-700 tracking-wider uppercase border border-paper-300">
                  {m.kind}
                </span>
                <h4 className="font-title-sm text-title-sm text-on-background line-clamp-2 mt-1">{m.title}</h4>
              </div>
            </div>
            <p className="font-caption text-caption text-ink-500 line-clamp-2 mt-auto pt-space-3 border-t border-paper-200">
              {(m.text || 'No content yet.').slice(0, 120)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
