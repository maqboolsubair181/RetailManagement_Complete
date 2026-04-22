import React, { useState } from 'react';
import { getCustomersByType } from '../api/retailApi';
import { TypeBadge, MethodBadge, Spinner, EmptyState, Alert } from '../components/Shared';
import { Search, Users } from 'lucide-react';

const TYPES = ['Silver', 'Gold', 'Platinum'];

const CustomersByType = () => {
  const [selectedType, setSelectedType] = useState('Gold');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setCustomers(null);
    try {
      const data = await getCustomersByType(selectedType);
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content page-enter">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon"><Users size={18} strokeWidth={1.75} /></div>
            <div>
              <div className="card-title">Get Customers by Type</div>
              <div className="card-description">
                Retrieve all customers filtered by their membership tier.
              </div>
              <div className="endpoint-path">
                GET /customer/controller/getCustomersByType/&#123;type&#125;
              </div>
            </div>
          </div>
          <MethodBadge method="GET" />
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="form-grid" style={{ gridTemplateColumns: '1fr auto' }}>
            <div className="form-group">
              <label htmlFor="customer-type-select" className="form-label">
                Customer Type
              </label>
              <select
                id="customer-type-select"
                className="form-control"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ justifyContent: 'flex-end' }}>
              <label className="form-label">&nbsp;</label>
              <button
                id="fetch-customers-btn"
                className="btn btn-primary"
                onClick={handleFetch}
                disabled={loading}
              >
                {loading ? <Spinner /> : <Search size={15} strokeWidth={2} />}
                {loading ? 'Fetching...' : 'Fetch Customers'}
              </button>
            </div>
          </div>

          {/* Preview badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Querying for:</span>
            <TypeBadge type={selectedType} />
          </div>

          {/* Error */}
          {error && (
            <div className="result-area">
              <Alert type="error" message={`Error: ${error}`} />
            </div>
          )}

          {/* Results */}
          {customers !== null && !error && (
            <div className="result-area">
              <div className="result-header">
                <span className="result-label">Results</span>
                <span className="result-count-badge">
                  {customers.length} customer{customers.length !== 1 ? 's' : ''} found
                </span>
              </div>

              {customers.length === 0 ? (
                <EmptyState text={`No ${selectedType} customers found.`} />
              ) : (
                <div className="table-wrapper">
                  <table className="data-table" aria-label="Customers results">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.customerId}>
                          <td>
                            <span
                              style={{
                                fontFamily: 'monospace',
                                fontSize: 12,
                                color: 'var(--text-muted)',
                              }}
                            >
                              #{c.customerId}
                            </span>
                          </td>
                          <td className="primary-cell">{c.customerName}</td>
                          <td>
                            <a
                              href={`mailto:${c.customerEmail}`}
                              style={{ color: 'var(--accent-blue-light)', textDecoration: 'none' }}
                            >
                              {c.customerEmail}
                            </a>
                          </td>
                          <td>
                            <TypeBadge type={c.customerType} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersByType;
