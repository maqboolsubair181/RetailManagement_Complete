import React from 'react';
import { Users, PencilLine, ShoppingCart, ReceiptText, Package, ArrowRight } from 'lucide-react';

const STAT_CARDS = [
  {
    label: 'Customer Tiers',
    value: '3',
    note: 'Silver · Gold · Platinum',
    accentVar: '--stat-1',
  },
  {
    label: 'Order Endpoints',
    value: '2',
    note: 'By ID · By Type & Range',
    accentVar: '--stat-2',
  },
  {
    label: 'Total Endpoints',
    value: '5',
    note: '3 GET · 2 PUT',
    accentVar: '--stat-3',
  },
  {
    label: 'Product Control',
    value: '1',
    note: 'Stock management',
    accentVar: '--stat-4',
  },
];

const ENDPOINT_CARDS = [
  {
    method: 'GET',
    path: '/customer/controller/getCustomersByType/{type}',
    title: 'Get Customers by Type',
    description: 'Retrieve all customers filtered by membership tier.',
    Icon: Users,
    page: 'customers-by-type',
  },
  {
    method: 'PUT',
    path: '/customer/controller/updateCustomer',
    title: 'Update Customer Type',
    description: "Promote or change a customer's membership tier.",
    Icon: PencilLine,
    page: 'update-customer',
  },
  {
    method: 'GET',
    path: '/order/controller/getOrderDetailsByCustomerId/{id}',
    title: 'Orders by Customer ID',
    description: 'Fetch all orders placed by a specific customer.',
    Icon: ShoppingCart,
    page: 'orders-by-customer',
  },
  {
    method: 'GET',
    path: '/order/controller/getOrderDetailsByCustomerTypeAndBillingRange/{type}--{min}--{max}',
    title: 'Orders by Type & Billing',
    description: 'Filter orders by customer tier and billing amount range.',
    Icon: ReceiptText,
    page: 'orders-by-billing',
  },
  {
    method: 'PUT',
    path: '/product/controller/updateProductStock',
    title: 'Update Product Stock',
    description: 'Adjust inventory stock levels for a product.',
    Icon: Package,
    page: 'update-stock',
  },
];

/* ─── Dot-grid SVG texture overlay ───────────────────────────────────────── */
const DotGrid = () => (
  <svg
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.18,
    }}
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── Hero ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: 12,
          background: '#0f172a',
          overflow: 'hidden',
          padding: '48px 40px',
        }}
      >
        <DotGrid />
        {/* Glow blob */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#f1f5f9',
              margin: '0 0 12px',
            }}
          >
            Welcome to{' '}
            <span style={{ color: '#818cf8' }}>RetailSync</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#94a3b8',
              maxWidth: 560,
              lineHeight: 1.7,
              margin: 0,
              fontSize: '1rem',
            }}
          >
            A production-ready portal to interact with your Spring Boot Retail Management API.
            Manage customers, track orders, and control product inventory — all in one place.
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {STAT_CARDS.map((stat, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              border: '1px solid var(--clr-border)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              borderRadius: 10,
              borderTop: `3px solid var(${stat.accentVar})`,
              padding: '20px 20px 18px',
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--clr-text-muted)',
                fontFamily: 'var(--font-body)',
                marginBottom: 8,
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '4rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'var(--clr-text)',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--clr-text-faint)',
                marginTop: 8,
                fontFamily: 'var(--font-body)',
              }}
            >
              {stat.note}
            </div>
          </div>
        ))}
      </div>

      {/* ── Endpoint Cards ── */}
      <div>
        <div style={{ marginBottom: 16 }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.125rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--clr-text)',
              margin: '0 0 4px',
            }}
          >
            API Endpoints
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--clr-text-muted)', margin: 0 }}>
            Click any card to navigate directly to that feature.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, gridAutoRows: '1fr' }}>
          {ENDPOINT_CARDS.map((ep) => {
            const isGet = ep.method === 'GET';
            const accentColor = isGet ? 'var(--clr-green)' : 'var(--clr-amber)';
            return (
              <button
                key={ep.page}
                id={`dash-card-${ep.page}`}
                onClick={() => onNavigate(ep.page)}
                style={{
                  background: '#fafafa',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  borderRadius: 10,
                  borderLeft: `3px solid ${accentColor}`,
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                }}
              >
                {/* Icon + method */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: isGet ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
                      border: `1px solid ${isGet ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: accentColor,
                    }}
                  >
                    <ep.Icon size={16} strokeWidth={1.75} />
                  </div>
                  <ArrowRight size={14} strokeWidth={2} style={{ color: 'var(--clr-text-faint)' }} />
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--clr-text)',
                    marginBottom: 6,
                  }}
                >
                  {ep.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--clr-text-muted)',
                    lineHeight: 1.55,
                    marginBottom: 14,
                    flex: 1,
                  }}
                >
                  {ep.description}
                </div>

                {/* Path */}
                <div
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.7rem',
                    color: 'var(--clr-text-faint)',
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    padding: '4px 8px',
                    borderRadius: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ep.path}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
