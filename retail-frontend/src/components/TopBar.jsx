import React from 'react';
import { Link2 } from 'lucide-react';

const PAGE_META = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of your retail management system',
  },
  'customers-by-type': {
    title: 'Browse Customers by Type',
    subtitle: 'GET /customer/controller/getCustomersByType/{type}',
  },
  'update-customer': {
    title: 'Update Customer Type',
    subtitle: 'PUT /customer/controller/updateCustomer',
  },
  'orders-by-customer': {
    title: 'Orders by Customer ID',
    subtitle: 'GET /order/controller/getOrderDetailsByCustomerId/{id}',
  },
  'orders-by-billing': {
    title: 'Orders by Type & Billing Range',
    subtitle: 'GET /order/controller/getOrderDetailsByCustomerTypeAndBillingRange/{type}--{min}--{max}',
  },
  'update-stock': {
    title: 'Update Product Stock',
    subtitle: 'PUT /product/controller/updateProductStock',
  },
};

const TopBar = ({ activePage }) => {
  const meta = PAGE_META[activePage] || { title: 'RetailSync', subtitle: '' };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: 64,
        background: 'rgba(248,249,252,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--clr-text)',
            margin: 0,
          }}
        >
          {meta.title}
        </h1>
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--clr-text-muted)',
            marginTop: 2,
            fontFamily: 'Courier New, monospace',
          }}
        >
          {meta.subtitle}
        </div>
      </div>


    </header>
  );
};

export default TopBar;
