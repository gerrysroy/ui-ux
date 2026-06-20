import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { CustomerListPage } from './pages/CustomerListPage';
import { AddCustomerPage } from './pages/AddCustomerPage';
import { EditCustomerPage } from './pages/EditCustomerPage';

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/add" element={<AddCustomerPage />} />
        <Route path="/edit/:id" element={<EditCustomerPage />} />
      </Routes>
    </MainLayout>
  );
}
