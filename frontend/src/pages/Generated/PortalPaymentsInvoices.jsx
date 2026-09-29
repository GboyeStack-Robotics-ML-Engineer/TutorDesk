import React, { useState, useEffect } from 'react';
import { api, NetworkError } from '../../lib/api';
import { useParentStudents } from '../../lib/useParentStudents';
import { ParentStudentSwitcher } from '../../components/ParentStudentSwitcher';

const STATUS_STYLE = {
  overdue: { label: 'Overdue', className: 'bg-danger-tint text-danger-solid border-danger-solid/20', bar: 'bg-danger-solid' },
  unpaid: { label: 'Pending', className: 'bg-warning-tint text-warning-solid border-warning-solid/20', bar: 'bg-warning-solid' },
  paid: { label: 'Paid', className: 'bg-success-tint text-success-solid border-success-solid/20', bar: 'bg-success-solid' },
};

function digitsOnly(raw) {
  return (raw || '').replace(/\D/g, '');
}

export const PortalPaymentsInvoices = () => {
  const { students, studentId, setStudentId, studentsError, loadingStudents } = useParentStudents();
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    api.parent
      .invoices({ studentId })
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setSelectedId(result.invoices?.[0]?.id || '');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof NetworkError
            ? "Couldn't load your invoices — the backend isn't reachable yet."
            : err.message || "Couldn't load your invoices."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  if (loadingStudents || loading) {
    return <p className="font-body text-body text-ink-500" data-live-page="payments-invoices">Loading…</p>;
  }

  if (studentsError || error) {
    return (
      <p role="alert" className="font-body text-body text-danger-solid bg-danger-tint rounded-lg p-4" data-live-page="payments-invoices">
        {studentsError || error}
      </p>
    );
  }

  if (!students.length) {
    return (
      <div data-live-page="payments-invoices" className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 text-center">
        <p className="font-body text-body text-ink-700">No students are linked to your account yet.</p>
      </div>
    );
  }

  const invoices = data?.invoices || [];
  const outstanding = invoices.filter((i) => i.status !== 'paid');
  const totalOutstanding = outstanding.reduce((sum, i) => sum + Number(i.total) - i.payments.reduce((p, pay) => p + Number(pay.amount), 0), 0);
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;
  const pendingCount = invoices.filter((i) => i.status === 'unpaid').length;
  const selected = invoices.find((i) => i.id === selectedId);

  const whatsappPhone = digitsOnly(data?.tutorWhatsapp);
  const waText = selected
    ? encodeURIComponent(`Hi ${data.tutorName || ''}, I've made the bank transfer for invoice ${selected.id.slice(0, 8)} (₦${Number(selected.total).toLocaleString()}). Please confirm receipt when you can. Thanks!`)
    : '';
  const waLink = whatsappPhone && selected ? `https://wa.me/${whatsappPhone}?text=${waText}` : null;

  return (
    <div data-live-page="payments-invoices">
      <ParentStudentSwitcher students={students} studentId={studentId} onChange={setStudentId} />

      <div className="max-w-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6">

          <div className="lg:col-span-7 space-y-space-6">
            <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[120px] text-primary">account_balance_wallet</span>
              </div>
              <div>
                <h2 className="font-label text-label text-ink-500 uppercase tracking-wider mb-2">Total Outstanding Balance</h2>
                <div className="font-display-lg text-display-lg text-on-surface">₦ {totalOutstanding.toLocaleString()}</div>
              </div>
              <div className="mt-space-6 flex items-center gap-3">
                {overdueCount > 0 && (
                  <div className="flex items-center gap-1 bg-danger-tint px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-danger-solid">warning</span>
                    <span className="font-caption text-caption text-danger-solid">{overdueCount} Overdue</span>
                  </div>
                )}
                {pendingCount > 0 && (
                  <div className="flex items-center gap-1 bg-warning-tint px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-warning-solid">schedule</span>
                    <span className="font-caption text-caption text-warning-solid">{pendingCount} Pending</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-space-4 border-b border-paper-200 pb-2">Invoices</h3>
              {invoices.length === 0 ? (
                <p className="font-body text-body text-ink-500">No invoices yet.</p>
              ) : (
                <div className="space-y-space-3">
                  {invoices.map((inv) => {
                    const style = STATUS_STYLE[inv.status] || STATUS_STYLE.unpaid;
                    const isSelected = inv.id === selectedId;
                    return (
                      <div
                        key={inv.id}
                        onClick={() => setSelectedId(inv.id)}
                        className={`${isSelected ? 'bg-surface-container-low border border-primary' : 'bg-paper-0 border border-paper-200 hover:border-paper-300'} rounded-lg p-space-4 cursor-pointer relative transition-transform hover:-translate-y-0.5`}
                      >
                        {isSelected && <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar} rounded-l-lg`} />}
                        <div className={`flex justify-between items-start mb-2 ${isSelected ? 'pl-2' : ''}`}>
                          <div>
                            <div className="font-title-sm text-title-sm text-on-surface">{inv.studentName} — {inv.id.slice(0, 8)}</div>
                            {inv.note && <div className="font-caption text-caption text-ink-500 mt-0.5">{inv.note}</div>}
                          </div>
                          <div className={`font-label text-label px-2 py-0.5 rounded-sm border ${style.className}`}>{style.label}</div>
                        </div>
                        <div className={`flex justify-between items-end mt-4 ${isSelected ? 'pl-2' : ''}`}>
                          <div className="font-caption text-caption text-ink-500">
                            {inv.status === 'paid' ? 'Paid' : 'Due'}: {new Date(inv.dueAt).toLocaleDateString()}
                          </div>
                          <div className="font-data-display text-data-display text-on-surface">₦ {Number(inv.total).toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {selected && (
            <div className="lg:col-span-5">
              <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)] sticky top-space-6">
                <div className="flex justify-between items-center mb-space-6 border-b border-paper-200 pb-4">
                  <h3 className="font-title-lg text-title-lg text-on-surface">{selected.id.slice(0, 8)}</h3>
                </div>

                <div className="mb-space-6">
                  <h4 className="font-label text-label text-ink-500 uppercase tracking-wider mb-3">Itemized Charges</h4>
                  <div className="space-y-3 font-body text-body text-on-surface">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-paper-100 pb-2">
                        <div>{item.desc}</div>
                        <div className="font-data-display text-data-display">₦ {(Number(item.qty) * Number(item.rate)).toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 font-title-sm text-title-sm">
                      <div>Total Amount Due</div>
                      <div className="font-data-display text-data-display text-danger-solid">₦ {Number(selected.total).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 mb-space-6">
                  <h4 className="font-label text-label text-ink-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">account_balance</span>
                    Payment Instructions
                  </h4>
                  {data?.paymentInstructions ? (
                    <p className="font-body text-body text-on-surface whitespace-pre-line">{data.paymentInstructions}</p>
                  ) : (
                    <p className="font-caption text-caption text-ink-500">
                      Your tutor hasn't added payment instructions yet — contact them directly to arrange payment.
                    </p>
                  )}
                </div>

                {selected.status !== 'paid' && (
                  <div className="pt-space-4 border-t border-paper-200">
                    {waLink ? (
                      <>
                        <p className="font-caption text-caption text-ink-500 mb-4 text-center">
                          After paying, confirm below to notify {data.tutorName || 'your tutor'} over WhatsApp.
                        </p>
                        <a href={waLink} target="_blank" rel="noreferrer"
                          className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-colors py-3 rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">check_circle</span>
                          I've Paid — Notify via WhatsApp
                        </a>
                      </>
                    ) : (
                      <p className="font-caption text-caption text-ink-500 text-center">
                        No phone number on file for your tutor — contact them directly to confirm payment.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
