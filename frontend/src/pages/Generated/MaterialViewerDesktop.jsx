import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Material viewer, wired to GET /api/materials/{id}/.
//
// Scoped down from the original static mockup: that version had elaborate
// fake PDF-viewer chrome (zoom controls, page counter), fake WAEC exam
// content, and a fake "assigned to 4 students" roster with stock avatar
// images — none of which is backed by anything real yet (there's no file
// storage, no PDF rendering, and no per-student assignment model). This
// shows the material's actual stored text instead of pretending those
// features exist.

export const MaterialViewerDesktop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoadError('No material selected.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    api.materials
      .get(id)
      .then((m) => { if (!cancelled) setMaterial(m); })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load this material.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return (
    <div data-live-page="material-viewer" className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center gap-space-3 mb-space-4">
        <button onClick={() => navigate('/portal/view/materials-library-desktop')}
          className="flex items-center gap-1 font-label text-label text-ink-700">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to library
        </button>
      </div>

      {loading && <p className="font-caption text-caption text-ink-500">Loading…</p>}
      {loadError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
          {loadError}
        </p>
      )}

      {material && (
        <div className="max-w-3xl mx-auto w-full bg-paper-0 border border-paper-200 rounded-xl overflow-hidden">
          <div className="border-b border-paper-200 p-space-4 bg-surface flex items-center gap-space-3">
            <span className="material-symbols-outlined text-ink-700">
              {material.kind === 'pdf' ? 'picture_as_pdf' : 'description'}
            </span>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">{material.title}</h3>
              <span className="font-caption text-caption text-ink-500 uppercase">{material.kind}</span>
            </div>
          </div>
          <div className="p-space-6">
            {material.text ? (
              <p className="font-body text-body text-on-surface whitespace-pre-wrap">{material.text}</p>
            ) : (
              <p className="font-caption text-caption text-ink-500 italic">No content added for this material yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
