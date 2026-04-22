import React, { useState } from 'react';
import { updateProductStock } from '../api/retailApi';
import { MethodBadge, Spinner, Alert } from '../components/Shared';
import { Package, RotateCcw } from 'lucide-react';

const UpdateStock = () => {
  const [form, setForm] = useState({
    productId: '',
    productName: '',
    price: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setResult(null);
    setError(null);
  };

  const isValid = form.productId && form.stock !== '' && parseInt(form.stock) >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = {
        productId: parseInt(form.productId),
        ...(form.productName && { productName: form.productName }),
        ...(form.price && { price: parseFloat(form.price) }),
        stock: parseInt(form.stock),
      };
      const data = await updateProductStock(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ productId: '', productName: '', price: '', stock: '' });
    setResult(null);
    setError(null);
  };

  return (
    <div className="page-content page-enter">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon"><Package size={18} strokeWidth={1.75} /></div>
            <div>
              <div className="card-title">Update Product Stock</div>
              <div className="card-description">
                Adjust the inventory stock level for a product by its ID.
              </div>
              <div className="endpoint-path">PUT /product/controller/updateProductStock</div>
            </div>
          </div>
          <MethodBadge method="PUT" />
        </div>

        {/* Body */}
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="form-group">
                <label htmlFor="ps-id" className="form-label">
                  Product ID <span style={{ color: 'var(--clr-amber)' }}>*</span>
                </label>
                <input
                  id="ps-id"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 1"
                  value={form.productId}
                  onChange={handleChange('productId')}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ps-stock" className="form-label">
                  New Stock Quantity <span style={{ color: 'var(--clr-amber)' }}>*</span>
                </label>
                <input
                  id="ps-stock"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 50"
                  value={form.stock}
                  onChange={handleChange('stock')}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ps-name" className="form-label">
                  Product Name (optional)
                </label>
                <input
                  id="ps-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Wireless Mouse"
                  value={form.productName}
                  onChange={handleChange('productName')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ps-price" className="form-label">
                  Price (optional)
                </label>
                <input
                  id="ps-price"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 24.99"
                  value={form.price}
                  onChange={handleChange('price')}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Products reference */}
            <div
              style={{
                background: 'rgba(99,102,241,0.04)',
                border: '1px solid rgba(99,102,241,0.1)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--clr-text-muted)',
                  marginBottom: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Sample Products (from DB)
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 8,
                }}
              >
                {[
                  { id: 1, name: 'Wireless Mouse', price: '$24.99' },
                  { id: 2, name: 'BT Keyboard', price: '$79.99' },
                  { id: 3, name: 'USB-C Hub', price: '$15.50' },
                  { id: 4, name: 'Laptop Stand', price: '$45.00' },
                  { id: 5, name: 'External HDD', price: '$60.75' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    id={`quick-fill-product-${p.id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', gap: 6 }}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        productId: String(p.id),
                        productName: p.name,
                      }))
                    }
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 11 }}>#{p.id}</span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Request body preview */}
            <div
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--clr-text-muted)',
                  marginBottom: 6,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Request Body Preview
              </div>
              <pre
                style={{
                  fontSize: 12,
                  color: 'var(--clr-text-muted)',
                  fontFamily: 'Courier New, monospace',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {JSON.stringify(
                  {
                    productId: form.productId ? parseInt(form.productId) : '...',
                    ...(form.productName && { productName: form.productName }),
                    ...(form.price && { price: parseFloat(form.price) }),
                    stock: form.stock !== '' ? parseInt(form.stock) : '...',
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                id="update-stock-submit"
                type="submit"
                className="btn btn-success"
                disabled={loading || !isValid}
              >
                {loading ? <Spinner /> : <Package size={15} strokeWidth={2} />}
                {loading ? 'Updating...' : 'Update Stock'}
              </button>
              <button
                id="update-stock-reset"
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

export default UpdateStock;
