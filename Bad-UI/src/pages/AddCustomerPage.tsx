import { useNavigate } from 'react-router-dom';
import { CustomerForm } from '../components/CustomerForm';
import { useCustomerContext } from '../hooks/CustomerContext';
import { createEmptyCustomer } from '../models/Customer';
import { customerService } from '../services/customerService';
import styles from './AddCustomerPage.module.css';
import { useAppToast } from '../hooks/useAppToast';

export function AddCustomerPage() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomerContext();
  const showToast = useAppToast();

  const initialData = {
    ...createEmptyCustomer(),
    customerNumber: customerService.generateCustomerNumber(),
  };

  const handleSubmit = async (data: typeof initialData) => {
    await addCustomer(data);
    showToast('Kunde erstellt', 'success');
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>NEW CUSTOMER FORM</h1>
      <p className={styles.subtitle}>fill in the fields below and press a button to save</p>

      <CustomerForm
        initialData={initialData}
        submitLabel="Submit"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
