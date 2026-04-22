import React, { useState } from 'react';
import { getOrdersByTypeAndBillingRange } from '../api/retailApi';
import {
  TypeBadge,
  MethodBadge,
  Spinner,
  EmptyState,
  Alert,
  formatCurrency,
  formatDate,
} from '../components/Shared';
import { Search, DollarSign, ReceiptText } from 'lucide-react';

const TYPES = ['Silver', 'Gold', 'Platinum'];

const OrdersByBilling = () => {
  const [form, setForm] = useState({ type: 'Gold', min: '', max: '' });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const isValid =
    form.type && form.min !== '' && form.max !== '' && parseFloat(form.min) <= parseFloat(form.max);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setOrders(null);
    setError(null);
  };

  const handleFetch = async () => {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    setOrders(null);
    try {
      const data = await getOrdersByTypeAndBillingRange(
        form.type,
        parseFloat(form.min),
        parseFloat(form.max)
      );
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalBilling =
    orders && orders.length > 0
      ? orders.reduce((acc, o) => acc + (o.billingAmount || 0), 0)
      : 0;

  return (
    <div className="page-content page-enter">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon"><ReceiptText size={18} strokeWidth={1.75} /></div>
            <div>
              <div className="card-title">Orders by Type & Billing Range</div>
              <div className="card-description">
                Filter orders by customer membership tier and a billing amount range.
              </div>
              <div className="endpoint-path">
                GET /order/controller/getOrderDetailsByCustomerTypeAndBillingRange/&#123;type&#125;--&#123;min&#125;--&#123;max&#125;
              </div>
            </div>
          </div>
          <MethodBadge method="GET" />
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="form-group">
              <label htmlFor="obr-type" className="form-label">
                Customer Type
              </label>
              <select
                id="obr-type"
                className="form-control"
                value={form.type}
                onChange={handleChange('type')}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="obr-min" className="form-label">
                Min Billing ($)
              </label>
              <input
                id="obr-min"
                type="number"
                className="form-control"
                placeholder="e.g. 10.00"
                value={form.min}
                onChange={handleChange('min')}
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="obr-max" className="form-label">
                Max Billing ($)
              </label>
              <input
                id="obr-max"
                type="number"
                className="form-control"
                placeholder="e.g. 100.00"
                value={form.max}
                onChange={handleChange('max')}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Validation hint */}
          {form.min && form.max && parseFloat(form.min) > parseFloat(form.max) && (
            <div style={{ marginBottom: 12 }}>
              <Alert type="error" message="Min billing must be ≤ Max billing." />
            </div>
          )}

          {/* Preview */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Query:</span>
            <TypeBadge type={form.type} />
            {form.min && form.max && (
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                billing {formatCurrency(parseFloat(form.min) || 0)} –{' '}
                {formatCurrency(parseFloat(form.max) || 0)}
              </span>
            )}
          </div>

          <button
            id="fetch-orders-billing-btn"
            className="btn btn-primary"
            onClick={handleFetch}
            disabled={loading || !isValid}
          >
            {loading ? <Spinner /> : <Search size={15} strokeWidth={2} />}
            {loading ? 'Fetching...' : 'Fetch Orders'}
          </button>

          {/* Error */}
          {error && (
            <div className="result-area">
              <Alert type="error" message={`Error: ${error}`} />
            </div>
          )}

          {/* Results */}
          {orders !== null && !error && (
            <div className="result-area">
              <div className="result-header">
                <span className="result-label">Results</span>
                <span className="result-count-badge">
                  {orders.length} order{orders.length !== 1 ? 's' : ''}
                </span>
              </div>

              {orders.length === 0 ? (
                <EmptyState
                  text={`No orders found for ${form.type} customers in the billing range $${form.min}–$${form.max}.`}
                />
              ) : (
                <>
                  {/* Total */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 16px',
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.15)',
                      borderRadius: 6,
                      fontSize: 13,
                      color: 'var(--clr-green)',
                      fontWeight: 500,
                      marginBottom: 14,
                    }}
                  >
                    <DollarSign size={13} strokeWidth={2} />
                    Total Revenue: {formatCurrency(totalBilling)}
                  </div>

                  <div className="table-wrapper">
                    <table className="data-table" aria-label="Orders by billing range results">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer Email</th>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Billing Amount</th>
                          <th>Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.orderId}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>
                                #{o.orderId}
                              </span>
                            </td>
                            <td>
                              <a
                                href={`mailto:${o.customerEmail}`}
                                style={{ color: 'var(--accent-blue-light)', textDecoration: 'none' }}
                              >
                                {o.customerEmail}
                              </a>
                            </td>
                            <td className="primary-cell">{o.productName || `Product #${o.productId}`}</td>
                            <td>×{o.quantity}</td>
                            <td>
                              <span style={{ color: '#22d3ee', fontWeight: 600 }}>
                                {formatCurrency(o.billingAmount)}
                              </span>
                            </td>
                            <td>{formatDate(o.orderDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersByBilling;
