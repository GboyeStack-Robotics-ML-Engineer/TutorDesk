import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';
import { naira } from '../../lib/store';

// Functional invoice maker.
// - Uses the tutor's brand (logo + primary/secondary colour + invoice name)
//   set in Brand setup.
// - Add/remove line items, pick a student, set dates & note.
// - Live branded preview on the right.
// - Saves to the backend via POST /api/invoices/.

const DEFAULT_BRAND = { logoDataUrl: null, primaryColor: '#005248', secondaryColor: '#C48037', invoiceName: '' };

export const InvoiceMaker = () => {
  const navigate = useNavigate();

  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [studentId, setStudentId] = useState('');
  const [issuedAt, setIssuedAt] = useState(new Date().toISOString().slice(0, 10));
  const [dueAt, setDueAt] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [items, setItems] = useState([{ desc: '', qty: 1, rate: 0 }]);
  const [note, setNote] = useState('Thank you for your continued trust.');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.brand.get(), api.students.list()])
      .then(([brandData, studentList]) => {
        if (cancelled) return;
        setBrand(brandData);
        setStudents(studentList || []);
        if (studentList?.[0]) setStudentId(studentList[0].id);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(
          err instanceof NetworkError ? err.message : err.message || "Couldn't load your students."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const student = students.find((s) => s.id === studentId);
  const total = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0) * Number(it.rate || 0), 0),
    [items]
  );

  const setItem = (i, patch) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const addItem = () => setItems((arr) => [...arr, { desc: '', qty: 1, rate: 0 }]);
  const removeItem = (i) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const save = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const invoice = await api.invoices.create({
        studentId,
        items: items
          .filter((it) => it.desc.trim() !== '' || it.rate)
          .map((it) => ({ desc: it.desc, qty: Number(it.qty || 0), rate: Number(it.rate || 0) })),
        issuedAt,
        dueAt,
        note,
      });
      setSavedId(invoice.id);
    } catch (err) {
      setSaveError(err instanceof NetworkError ? err.message : err.message || "Couldn't save this invoice.");
    } finally {
      setSaving(false);
    }
  };

  const primary = brand.primaryColor;
  const secondary = brand.secondaryColor;

  return (
    <div data-live-page="invoice-maker" className="flex flex-col gap-space-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-title-md text-ink-900">Invoice maker</h1>
          <p className="font-caption text-caption text-ink-500">
            Branded with your logo and colours from Brand setup.
          </p>
        </div>
        <div className="flex items-center gap-space-3">
          <button
            onClick={() => navigate('/portal/view/branding-settings')}
            className="flex items-center gap-2 border border-paper-300 bg-paper-0 px-space-3 py-2 rounded-lg font-label text-label text-ink-700 hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[18px]">palette</span>
            Branding
          </button>
          <button
            onClick={save}
            disabled={loading || saving || !studentId}
            className="flex items-center gap-2 text-white px-space-4 py-2 rounded-lg font-label text-label disabled:opacity-60"
            style={{ background: primary }}
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {saving ? 'Saving…' : 'Save invoice'}
          </button>
        </div>
      </div>

      {loadError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
          {loadError}
        </p>
      )}
      {saveError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
          {saveError}
        </p>
      )}

      {savedId && (
        <div className="flex items-center gap-2 bg-success-tint text-success-solid px-space-4 py-space-3 rounded-lg font-label text-label">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Saved.
          <button className="underline ml-2" onClick={() => navigate(`/portal/view/invoice-detail-desktop?id=${savedId}`)}>
            View invoice
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-5">
        {/* Editor */}
        <div className="flex flex-col gap-space-4 bg-paper-0 border border-paper-200 rounded-xl p-space-5">
          <div>
            <label className="font-label text-label text-ink-700">Bill to (student)</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={loading}
              className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body bg-paper-0 focus:outline-none focus:border-primary disabled:opacity-60"
            >
              <option value="">{loading ? 'Loading students…' : 'Select a student'}</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}{s.subjects?.length ? ` — ${s.subjects.join(', ')}` : ''}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-space-3">
            <div>
              <label className="font-label text-label text-ink-700">Issued</label>
              <input type="date" value={issuedAt} onChange={(e) => setIssuedAt(e.target.value)}
                className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-label text-label text-ink-700">Due</label>
              <input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)}
                className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-space-2">
              <label className="font-label text-label text-ink-700">Line items</label>
              <button onClick={addItem} className="flex items-center gap-1 font-label text-caption" style={{ color: primary }}>
                <span className="material-symbols-outlined text-[18px]">add</span> Add item
              </button>
            </div>
            <div className="flex flex-col gap-space-2">
              {items.map((it, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    placeholder="Description"
                    value={it.desc}
                    onChange={(e) => setItem(i, { desc: e.target.value })}
                    className="flex-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number" min="0" placeholder="Qty" value={it.qty}
                    onChange={(e) => setItem(i, { qty: e.target.value })}
                    className="w-16 border border-paper-300 rounded-lg px-2 py-2 font-body text-body text-center focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number" min="0" placeholder="Rate" value={it.rate}
                    onChange={(e) => setItem(i, { rate: e.target.value })}
                    className="w-24 border border-paper-300 rounded-lg px-2 py-2 font-body text-body text-right focus:outline-none focus:border-primary"
                  />
                  <button onClick={() => removeItem(i)} className="text-ink-500 hover:text-danger-solid" title="Remove">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-label text-label text-ink-700">Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
              className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary resize-none" />
          </div>
        </div>

        {/* Live branded preview */}
        <div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden self-start">
          <div className="h-2" style={{ background: primary }} />
          <div className="p-space-5">
            <div className="flex items-start justify-between mb-space-5">
              <div className="flex items-center gap-space-3">
                {brand.logoDataUrl ? (
                  <img src={brand.logoDataUrl} alt="logo" className="w-14 h-14 object-contain rounded-lg" />
                ) : (
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center font-heading text-title-sm text-white"
                    style={{ background: primary }}>
                    {(brand.invoiceName || 'T')[0]}
                  </div>
                )}
                <div>
                  <div className="font-heading text-title-sm text-ink-900">{brand.invoiceName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-heading text-title-sm" style={{ color: primary }}>INVOICE</div>
                <div className="font-caption text-caption text-ink-500">{issuedAt}</div>
              </div>
            </div>

            <div className="flex justify-between mb-space-4">
              <div>
                <div className="font-caption text-caption text-ink-500 uppercase">Bill to</div>
                <div className="font-label text-label text-ink-900">{student?.name}</div>
                <div className="font-caption text-caption text-ink-500">{student?.guardianName}</div>
              </div>
              <div className="text-right">
                <div className="font-caption text-caption text-ink-500 uppercase">Due</div>
                <div className="font-label text-label text-ink-900">{dueAt}</div>
              </div>
            </div>

            <table className="w-full mb-space-4">
              <thead>
                <tr style={{ background: `${secondary}22` }}>
                  <th className="text-left font-label text-caption text-ink-700 px-space-3 py-2">Description</th>
                  <th className="text-center font-label text-caption text-ink-700 px-2 py-2">Qty</th>
                  <th className="text-right font-label text-caption text-ink-700 px-space-3 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="border-b border-paper-200">
                    <td className="px-space-3 py-2 font-body text-body text-ink-900">{it.desc || '—'}</td>
                    <td className="px-2 py-2 font-body text-body text-center text-ink-700">{it.qty}</td>
                    <td className="px-space-3 py-2 font-body text-body text-right text-ink-900">{naira(it.qty * it.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-1/2">
                <div className="flex justify-between items-center px-space-3 py-2 rounded-lg text-white" style={{ background: primary }}>
                  <span className="font-label text-label">Total</span>
                  <span className="font-heading text-title-sm">{naira(total)}</span>
                </div>
              </div>
            </div>

            {note && <p className="mt-space-4 font-caption text-caption text-ink-500 italic">{note}</p>}
            <div className="mt-space-4 pt-space-3 border-t border-paper-200 flex items-center gap-2 font-caption text-caption text-ink-500">
              <span className="w-3 h-3 rounded-full" style={{ background: secondary }} />
              Generated with TutorDesk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
