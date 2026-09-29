import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';

// Record a payment against an invoice — wired to
// POST /api/invoices/{id}/payments/.

export const RecordPaymentDesktop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [amount, setAmount] = useState('');
  const [paidAt, setPaidAt] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState('bank_transfer');
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');
  const [markPaid, setMarkPaid] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoadError('No invoice selected.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    api.invoices
      .get(id)
      .then((inv) => {
        if (cancelled) return;
        setInvoice(inv);
        setAmount(String(inv.total));
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load this invoice.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async () => {
    setSubmitError('');
    if (!amount || Number(amount) <= 0) {
      setSubmitError('Enter an amount greater than zero.');
      return;
    }
    setSubmitting(true);
    try {
      await api.invoices.recordPayment(id, {
        amount: Number(amount),
        method,
        paidAt,
        reference,
        note,
        markPaid,
      });
      navigate(`/portal/view/invoice-detail-desktop?id=${id}`);
    } catch (err) {
      setSubmitError(err instanceof NetworkError ? err.message : err.message || 'Could not record this payment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-live-page="record-payment">
      {loading && <p className="font-caption text-caption text-ink-500 p-space-6">Loading…</p>}
      {loadError && (
        <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3 m-space-6">
          {loadError}
        </p>
      )}
      <div className="p-space-6 overflow-y-auto flex-grow space-y-space-8">
        {invoice && (
          <p className="font-caption text-caption text-ink-500">
            For {invoice.studentName}'s invoice — total {invoice.total}
          </p>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
          <div className="space-y-space-2">
            <label className="block font-label text-label text-ink-700" htmlFor="amount">Amount Received</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-data-display text-data-display text-ink-500">₦</span>
              <input
                className="w-full pl-8 pr-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
                id="amount" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-space-2">
            <label className="block font-label text-label text-ink-700" htmlFor="payment_date">Payment Date</label>
            <input
              className="w-full pl-3 pr-10 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
              id="payment_date" type="date" value={paidAt} onChange={(e) => setPaidAt(e.target.value)}
            />
          </div>
        </section>

        <section className="space-y-space-3">
          <label className="block font-label text-label text-ink-700">Payment Method</label>
          <div className="grid grid-cols-3 gap-space-3">
            {[
              { value: 'bank_transfer', label: 'Transfer', icon: 'account_balance' },
              { value: 'cash', label: 'Cash', icon: 'payments' },
              { value: 'card', label: 'Card', icon: 'credit_card' },
            ].map((opt) => (
              <label key={opt.value} className="cursor-pointer relative">
                <input
                  className="sr-only peer" name="payment_method" type="radio" value={opt.value}
                  checked={method === opt.value} onChange={() => setMethod(opt.value)}
                />
                <div className={`h-full border rounded-lg p-space-3 flex flex-col items-center justify-center text-center gap-space-2 transition-colors bg-paper-0 ${method === opt.value ? 'border-primary text-primary' : 'border-paper-300 text-ink-700'}`}>
                  <span className="material-symbols-outlined">{opt.icon}</span>
                  <span className="font-label text-label">{opt.label}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-space-4">
          <div className="space-y-space-2">
            <label className="block font-label text-label text-ink-700" htmlFor="reference">
              Reference / Transaction ID <span className="text-ink-500 font-normal">(Optional)</span>
            </label>
            <input
              className="w-full px-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors"
              id="reference" placeholder="e.g. GTB/TRF/092..." type="text" value={reference} onChange={(e) => setReference(e.target.value)}
            />
          </div>
          <div className="space-y-space-2">
            <label className="block font-label text-label text-ink-700" htmlFor="notes">
              Internal Note <span className="text-ink-500 font-normal">(Optional)</span>
            </label>
            <textarea
              className="w-full px-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors resize-none"
              id="notes" placeholder="Add a private note regarding this payment..." rows="2" value={note} onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </section>

        <section className="p-space-4 bg-paper-100 rounded-lg border border-paper-200 flex items-center justify-between">
          <div>
            <h3 className="font-title-sm text-title-sm text-ink-900">Mark invoice as paid</h3>
            <p className="font-caption text-caption text-ink-500 mt-1">Updates the invoice's status.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input className="sr-only peer" type="checkbox" checked={markPaid} onChange={(e) => setMarkPaid(e.target.checked)} />
            <div className="w-11 h-6 bg-paper-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-paper-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </section>

        {submitError && (
          <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3">
            {submitError}
          </p>
        )}
      </div>

      <footer className="px-space-6 py-space-4 border-t border-paper-200 bg-surface-bright flex justify-end gap-space-3 shrink-0">
        <button
          type="button" onClick={handleCancel} disabled={submitting}
          className="px-space-4 py-2 rounded-DEFAULT font-label text-label text-ink-700 border border-paper-300 bg-paper-0 hover:bg-paper-100 transition-colors disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button" onClick={handleSubmit} disabled={submitting}
          className="px-space-4 py-2 rounded-DEFAULT font-label text-label text-white bg-primary hover:bg-primary-container transition-colors flex items-center gap-space-2 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          {submitting ? 'Recording…' : 'Record Payment'}
        </button>
      </footer>
    </div>
  );
};
