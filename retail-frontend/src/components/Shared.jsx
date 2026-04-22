import React from 'react';
import { CheckCircle2, XCircle, Search, Loader2 } from 'lucide-react';

/**
 * Reusable type badge for Silver / Gold / Platinum
 */
export const TypeBadge = ({ type }) => {
  const styles = {
    Platinum: {
      background: 'rgba(99,102,241,0.08)',
      color: '#6366f1',
      border: '1px solid rgba(99,102,241,0.2)',
    },
    Gold: {
      background: 'rgba(245,158,11,0.08)',
      color: '#d97706',
      border: '1px solid rgba(245,158,11,0.2)',
    },
    Silver: {
      background: 'rgba(100,116,139,0.08)',
      color: '#64748b',
      border: '1px solid rgba(100,116,139,0.15)',
    },
  };

  const s = styles[type] || styles.Silver;

  return (
    <span
      style={{
        ...s,
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 100,
        fontSize: '0.6875rem',
        fontWeight: 500,
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
      }}
    >
      {type}
    </span>
  );
};

/**
 * HTTP method label (no pill background — just colored text)
 */
export const MethodBadge = ({ method }) => (
  <span
    className={method === 'GET' ? 'method-label method-label-get' : 'method-label method-label-put'}
    style={{ fontSize: '0.6875rem' }}
  >
    {method}
  </span>
);

/**
 * Loading spinner
 */
export const Spinner = () => (
  <Loader2 size={15} strokeWidth={2} className="animate-spin" aria-label="Loading..." />
);

/**
 * Alert / result message
 */
export const Alert = ({ type = 'info', message }) => {
  const isError = type === 'error';
  const isSuccess = type === 'success';

  const style = isError
    ? { background: 'rgba(239,68,68,0.06)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }
    : isSuccess
    ? { background: 'rgba(34,197,94,0.06)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.15)' }
    : { background: 'rgba(99,102,241,0.06)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' };

  const Icon = isError ? XCircle : CheckCircle2;

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 8,
        fontSize: '0.8125rem',
      }}
      className="animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <Icon size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
      <span
        style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {typeof message === 'object' ? JSON.stringify(message, null, 2) : message}
      </span>
    </div>
  );
};

/**
 * Empty state
 */
export const EmptyState = ({ text = 'No results found.' }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '48px 24px',
      color: 'var(--clr-text-muted)',
      border: '1px dashed rgba(0,0,0,0.1)',
      borderRadius: 8,
      background: 'rgba(248,249,252,0.5)',
    }}
  >
    <Search size={32} strokeWidth={1.5} style={{ margin: '0 auto 12px', opacity: 0.35 }} />
    <p style={{ fontSize: '0.875rem', margin: 0 }}>{text}</p>
  </div>
);

/**
 * Format currency
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

/**
 * Format date
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return '—';
  const d = new Date(dateVal);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
