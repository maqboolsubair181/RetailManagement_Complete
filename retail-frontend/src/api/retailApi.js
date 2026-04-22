/**
 * Central API service for the Retail Management System.
 *
 * BASE_URL resolution order:
 *   1. VITE_API_URL env var (set at build time via .env or Docker build-arg)
 *   2. '/api'  — production default when served behind Nginx reverse proxy
 *
 * This means every fetch goes to:
 *   /api/customer/controller/...
 *   /api/order/controller/...
 *   /api/product/controller/...
 *
 * Nginx (see nginx.conf) strips '/api' and forwards the rest to the backend.
 */
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}: ${res.statusText}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
};

// ─── Customer APIs ────────────────────────────────────────────────────────────

/** GET /api/customer/controller/getCustomersByType/{type} */
export const getCustomersByType = async (type) => {
  const res = await fetch(`${BASE_URL}/customer/controller/getCustomersByType/${encodeURIComponent(type)}`);
  return handleResponse(res);
};

/** PUT /api/customer/controller/updateCustomer */
export const updateCustomerType = async (customerBean) => {
  const res = await fetch(`${BASE_URL}/customer/controller/updateCustomer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerBean),
  });
  return handleResponse(res);
};

// ─── Order APIs ───────────────────────────────────────────────────────────────

/** GET /api/order/controller/getOrderDetailsByCustomerId/{id} */
export const getOrdersByCustomerId = async (id) => {
  const res = await fetch(`${BASE_URL}/order/controller/getOrderDetailsByCustomerId/${id}`);
  return handleResponse(res);
};

/** GET /api/order/controller/getOrderDetailsByCustomerTypeAndBillingRange/{type}--{min}--{max} */
export const getOrdersByTypeAndBillingRange = async (type, min, max) => {
  const res = await fetch(
    `${BASE_URL}/order/controller/getOrderDetailsByCustomerTypeAndBillingRange/${encodeURIComponent(type)}--${min}--${max}`
  );
  return handleResponse(res);
};

// ─── Product APIs ─────────────────────────────────────────────────────────────

/** PUT /api/product/controller/updateProductStock */
export const updateProductStock = async (productBean) => {
  const res = await fetch(`${BASE_URL}/product/controller/updateProductStock`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productBean),
  });
  return handleResponse(res);
};
