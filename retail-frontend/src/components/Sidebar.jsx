import React from 'react';
import {
  LayoutDashboard,
  Users,
  PencilLine,
  ShoppingCart,
  ReceiptText,
  Package,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard, badge: null },
    ],
  },
  {
    section: 'Customers',
    items: [
      { id: 'customers-by-type', label: 'Browse by Type', Icon: Users, badge: 'GET' },
      { id: 'update-customer',   label: 'Update Customer', Icon: PencilLine, badge: 'PUT' },
    ],
  },
  {
    section: 'Orders',
    items: [
      { id: 'orders-by-customer', label: 'By Customer ID',    Icon: ShoppingCart, badge: 'GET' },
      { id: 'orders-by-billing',  label: 'By Type & Billing', Icon: ReceiptText,  badge: 'GET' },
    ],
  },
  {
    section: 'Products',
    items: [
      { id: 'update-stock', label: 'Update Stock', Icon: Package, badge: 'PUT' },
    ],
  },
];

const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside
      style={{ background: 'var(--sidebar-bg)' }}
      className="w-64 min-h-screen flex flex-col fixed top-0 left-0 z-40 border-r"
      style={{
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--clr-indigo)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 16,
              color: '#fff',
              letterSpacing: '-0.03em',
              flexShrink: 0,
            }}
          >
            R
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.03em',
              color: '#f1f5f9',
            }}
          >
            RetailSync
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto" style={{ padding: '16px 12px' }} aria-label="Main navigation">
        {NAV_ITEMS.map((section) => (
          <div key={section.section} style={{ marginBottom: 24 }}>
            {/* Section label */}
            <div
              style={{
                padding: '0 12px',
                marginBottom: 6,
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--sidebar-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {section.section}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => onNavigate(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      borderLeft: isActive
                        ? '2px solid var(--sidebar-active-border)'
                        : '2px solid transparent',
                      background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                      color: isActive ? '#f1f5f9' : 'var(--sidebar-text)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.color = '#f1f5f9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--sidebar-text)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <item.Icon size={16} strokeWidth={1.75} />
                      <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: isActive ? 500 : 400 }}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={item.badge === 'GET' ? 'method-label method-label-get' : 'method-label method-label-put'}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>


    </aside>
  );
};

export default Sidebar;
