import React, { useState } from 'react';
import { updateCustomerType } from '../api/retailApi';
import { MethodBadge, Spinner, Alert } from '../components/Shared';
import { PencilLine, RotateCcw } from 'lucide-react';

const TYPES = ['Silver', 'Gold', 'Platinum'];

const UpdateCustomer = () => {
  const [form, setForm] = useState({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerType: 'Gold',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setResult(null);
    setError(null);
  };

  const isValid = form.customerId.trim() && form.customerType;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = {
        customerId: form.customerId ? parseInt(form.customerId) : undefined,
        customerName: form.customerName || undefined,
        customerEmail: form.customerEmail.trim(),
        customerType: form.customerType,
      };
      const data = await updateCustomerType(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ customerId: '', customerName: '', customerEmail: '', customerType: 'Gold' });
    setResult(null);
    setError(null);
  };

  return (
    <div className="page-content page-enter">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon"><PencilLine size={18} strokeWidth={1.75} /></div>
            <div>
              <div className="card-title">Update Customer Type</div>
              <div className="card-description">
                Change a customer's membership tier by providing their ID and the new type.
              </div>
              <div className="endpoint-path">PUT /customer/controller/updateCustomer</div>
            </div>
          </div>
          <MethodBadge method="PUT" />
        </div>

        {/* Body */}
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="form-group">
                <label htmlFor="uc-id" className="form-label">
                  Customer ID <span style={{ color: 'var(--clr-amber)' }}>*</span>
                </label>
                <input
                  id="uc-id"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 3"
                  value={form.customerId}
                  onChange={handleChange('customerId')}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="uc-name" className="form-label">
                  Customer Name (optional)
                </label>
                <input
                  id="uc-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={form.customerName}
                  onChange={handleChange('customerName')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="uc-email" className="form-label">
                  Customer Email (optional)
                </label>
                <input
                  id="uc-email"
                  type="email"
                  className="form-control"
                  placeholder="e.g. johndoe@gmail.com"
                  value={form.customerEmail}
                  onChange={handleChange('customerEmail')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="uc-type" className="form-label">
                  New Customer Type <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <select
                  id="uc-type"
                  className="form-control"
                  value={form.customerType}
                  onChange={handleChange('customerType')}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Request payload preview */}
            <div
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Request Body Preview
              </div>
              <pre
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  fontFamily: 'Courier New, monospace',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {JSON.stringify(
                  {
                    ...(form.customerId && { customerId: parseInt(form.customerId) }),
                    ...(form.customerName && { customerName: form.customerName }),
                    ...(form.customerEmail && { customerEmail: form.customerEmail }),
                    customerType: form.customerType,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                id="update-customer-submit"
                type="submit"
                className="btn btn-warning"
                disabled={loading || !isValid}
              >
                {loading ? <Spinner /> : <PencilLine size={15} strokeWidth={2} />}
                {loading ? 'Updating...' : 'Update Customer'}
              </button>
              <button
                id="update-customer-reset"
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                <RotateCcw size={14} strokeWidth={2} /> Reset
              </button>
            </div>
          </form>

          {/* Result */}
          {(result || error) && (
            <div className="result-area">
              {error ? (
                <Alert type="error" message={`Error: ${error}`} />
              ) : (
                <Alert type="success" message={result} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
