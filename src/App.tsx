import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DebtProvider } from './context/DebtContext';
import { PaymentProvider } from './context/PaymentContext';
import { PaymentPeriodProvider } from './context/PaymentPeriodContext';
import { DebtCategoryProvider } from './context/DebtCategoryContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DebtList from './components/debt/DebtList';
import CategoryManager from './components/category/CategoryManager';
import PaymentPeriodManager from './components/payment/PaymentPeriodManager';
import LoginForm from './components/auth/LoginForm';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/debts" element={<DebtList />} />
        <Route path="/categories" element={<CategoryManager />} />
        <Route path="/payment-periods" element={<PaymentPeriodManager />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DebtCategoryProvider>
          <PaymentPeriodProvider>
            <DebtProvider>
              <PaymentProvider>
                <AppContent />
              </PaymentProvider>
            </DebtProvider>
          </PaymentPeriodProvider>
        </DebtCategoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;