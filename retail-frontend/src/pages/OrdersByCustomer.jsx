import React, { useState } from 'react';
import { getOrdersByCustomerId } from '../api/retailApi';
import { MethodBadge, Spinner, EmptyState, Alert, formatCurrency, formatDate } from '../components/Shared';
import { Search, Mail, DollarSign, ShoppingCart } from 'lucide-react';

const OrdersByCustomer = () => {
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!customerId) return;
    setLoading(true);
    setError(null);
    setOrders(null);
    try {
      const data = await getOrdersByCustomerId(parseInt(customerId));
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFetch();
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
            <div className="card-icon"><ShoppingCart size={18} strokeWidth={1.75} /></div>
            <div>
              <div className="card-title">Orders by Customer ID</div>
              <div className="card-description">
                View all orders placed by a specific customer.
              </div>
              <div className="endpoint-path">
                GET /order/controller/getOrderDetailsByCustomerId/&#123;id&#125;
              </div>
            </div>
          </div>
          <MethodBadge method="GET" />
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="form-grid" style={{ gridTemplateColumns: '1fr auto' }}>
            <div className="form-group">
              <label htmlFor="customer-id-input" className="form-label">
                Customer ID
              </label>
              <input
                id="customer-id-input"
                type="number"
                className="form-control"
                placeholder="e.g. 1"
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  setOrders(null);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                min="1"
              />
            </div>
            <div className="form-group" style={{ justifyContent: 'flex-end' }}>
              <label className="form-label">&nbsp;</label>
              <button
                id="fetch-orders-by-customer-btn"
                className="btn btn-primary"
                onClick={handleFetch}
                disabled={loading || !customerId}
              >
                {loading ? <Spinner /> : <Search size={15} strokeWidth={2} />}
                {loading ? 'Fetching...' : 'Fetch Orders'}
              </button>
            </div>
          </div>

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
                <EmptyState text={`No orders found for Customer ID ${customerId}.`} />
              ) : (
                <>
                  {/* Summary strip */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      marginBottom: 14,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(99,102,241,0.08)',
                        border: '1px solid rgba(99,102,241,0.15)',
                        borderRadius: 6,
                        fontSize: 13,
                        color: 'var(--clr-indigo)',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Mail size={13} strokeWidth={2} />
                      {orders[0]?.customerEmail || '—'}
                    </div>
                    <div
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(34,197,94,0.08)',
                        border: '1px solid rgba(34,197,94,0.15)',
                        borderRadius: 6,
                        fontSize: 13,
                        color: 'var(--clr-green)',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <DollarSign size={13} strokeWidth={2} />
                      Total: {formatCurrency(totalBilling)}
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table className="data-table" aria-label="Orders by customer results">
                      <thead>
                        <tr>
                          <th>Order ID</th>
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
                            <td className="primary-cell">{o.productName || `Product #${o.productId}`}</td>
                            <td>
                              <span style={{ color: 'var(--text-secondary)' }}>×{o.quantity}</span>
                            </td>
                            <td>
                              <span style={{ color: '#34d399', fontWeight: 600 }}>
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

export default OrdersByCustomer;
