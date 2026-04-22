import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import CustomersByType from './pages/CustomersByType';
import UpdateCustomer from './pages/UpdateCustomer';
import OrdersByCustomer from './pages/OrdersByCustomer';
import OrdersByBilling from './pages/OrdersByBilling';
import UpdateStock from './pages/UpdateStock';

const PAGES = {
  dashboard: Dashboard,
  'customers-by-type': CustomersByType,
  'update-customer': UpdateCustomer,
  'orders-by-customer': OrdersByCustomer,
  'orders-by-billing': OrdersByBilling,
  'update-stock': UpdateStock,
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const PageComponent = PAGES[activePage] || Dashboard;

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    // Scroll main content to top
    const main = document.getElementById('main-scroll');
    if (main) main.scrollTop = 0;
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <main className="ml-64 flex-1 min-h-screen overflow-y-auto" id="main-scroll">
        <TopBar activePage={activePage} />
        <div className="p-8 max-w-6xl mx-auto">
          <PageComponent onNavigate={handleNavigate} />
        </div>
      </main>
    </div>
  );
}

export default App;
