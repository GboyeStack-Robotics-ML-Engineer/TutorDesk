import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, NetworkError } from '../../lib/api';
import { naira } from '../../lib/store';

// Invoice detail, wired to GET /api/invoices/{id}/.
//
// Scoped down from the original static mockup: that had a fake student
// name/ID, fake bank-transfer details, and a fake activity log with no
// real events behind it, plus a "Send Reminder" button with no handler.
// This shows the invoice's real items, status, and payments, and drops
// bank details and reminders — nothing backs them yet (no tutor payout
// account model, no reminder-sending endpoint — see PRD task E.16).

const STATUS_STYLE = {
  paid: { label: 'Paid', bg: 'bg-success-tint', text: 'text-success-solid', border: 'border-success-solid/20' },
  unpaid: { label: 'Unpaid', bg: 'bg-warning-tint', text: 'text-warning-solid', border: 'border-warning-solid/20' },
  overdue: { label: 'Overdue', bg: 'bg-danger-tint', text: 'text-danger-solid', border: 'border-danger-solid/20' },
};

export const InvoiceDetailDesktop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoadError('No invoice selected.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    api.invoices
      .get(id)
      .then((inv) => { if (!cancelled) setInvoice(inv); })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof NetworkError ? err.message : err.message || "Couldn't load this invoice.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <p className="font-caption text-caption text-ink-500 p-space-6">Loading…</p>;
  if (loadError) {
    return (
      <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-3 m-space-6">
        {loadError}
      </p>
    );
  }
  if (!invoice) return null;

  const style = STATUS_STYLE[invoice.status] || STATUS_STYLE.unpaid;

  return (
    <div data-live-page="invoice-detail" className="flex-1 max-w-[1200px] w-full mx-auto px-gutter-mobile md:px-gutter-desktop py-space-6 md:py-space-8 grid grid-cols-1 lg:grid-cols-12 gap-space-6">

      <div className="lg:col-span-8 flex flex-col gap-space-4">

        <div className={`bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-space-4 relative overflow-hidden`}>
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.text.replace('text-', 'bg-')}`}></div>
          <div>
            <div className="flex items-center gap-space-2 mb-space-2">
              <span className={`${style.bg} ${style.text} font-label text-label px-2 py-1 rounded border ${style.border}`}>{style.label}</span>
              <span className="text-ink-500 font-caption text-caption">Due {invoice.dueAt}</span>
            </div>
            <h2 className="font-display-md text-display-md text-primary">{invoice.studentName}</h2>
          </div>
          <div className="text-left md:text-right">
            <p className="text-ink-500 font-label text-label uppercase tracking-wider mb-1">Total Amount Due</p>
            <p className="font-data-display text-[32px] leading-[38px] font-semibold text-primary">{naira(invoice.total)}</p>
          </div>
        </div>

        <div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
          <h3 className="font-title-sm text-title-sm text-primary mb-space-4 border-b border-paper-200 pb-space-2">Itemized Charges</h3>
          <div className="flex flex-col gap-space-4">
            {invoice.items.map((it, i) => (
              <div key={i} className="flex justify-between items-start py-space-2 border-b border-paper-100 last:border-0">
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface">{it.desc || 'Item'}</p>
                  <p className="text-ink-500 font-caption text-caption">{it.qty} × {naira(it.rate)}</p>
                </div>
                <span className="font-data-display text-data-display text-primary">{naira(it.qty * it.rate)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-space-4 mt-space-2 border-t-2 border-paper-200">
              <span className="font-title-md text-title-md text-primary">Total</span>
              <span className="font-data-display text-[20px] leading-[26px] font-semibold text-primary">{naira(invoice.total)}</span>
            </div>
          </div>
        </div>

        {invoice.note && (
          <div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
            <h3 className="font-title-sm text-title-sm text-primary mb-space-2">Note</h3>
            <p className="font-body text-body text-on-surface">{invoice.note}</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 flex flex-col gap-space-4">

        <div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6 flex flex-col gap-space-3">
          <button
            onClick={() => navigate(`/portal/view/record-payment-desktop?id=${invoice.id}`)}
            className="w-full bg-primary text-on-primary font-label text-label py-3 px-4 rounded transition-colors hover:bg-primary-container flex items-center justify-center gap-space-2"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            Record Payment
          </button>
        </div>

        <div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
          <h3 className="font-title-sm text-title-sm text-primary mb-space-4 pb-space-2 border-b border-paper-200">Payments</h3>
          {invoice.payments.length === 0 ? (
            <p className="font-caption text-caption text-ink-500">No payments recorded yet.</p>
          ) : (
            <div className="flex flex-col gap-space-3">
              {invoice.payments.map((p) => (
                <div key={p.id} className="flex justify-between items-start border-b border-paper-100 last:border-0 pb-space-2">
                  <div>
                    <p className="font-body text-body text-on-surface capitalize">{p.method.replace('_', ' ')}</p>
                    <p className="font-caption text-caption text-ink-500">{p.paidAt}{p.reference ? ` · ${p.reference}` : ''}</p>
                  </div>
                  <span className="font-data-display text-data-display text-primary">{naira(p.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
