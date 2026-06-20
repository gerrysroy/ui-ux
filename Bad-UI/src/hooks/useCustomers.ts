import { useCallback, useState } from 'react';
import type { Customer, CustomerFormData } from '../models/Customer';
import { customerService } from '../services/customerService';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(() => customerService.getAll());

  const refresh = useCallback(() => {
    setCustomers(customerService.getAll());
  }, []);

  const addCustomer = useCallback(async (data: CustomerFormData) => {
    await customerService.add(data);
    refresh();
  }, [refresh]);

  const updateCustomer = useCallback(async (id: string, data: CustomerFormData) => {
    await customerService.update(id, data);
    refresh();
  }, [refresh]);

  const deleteCustomer = useCallback(async (id: string) => {
    await customerService.delete(id);
    refresh();
  }, [refresh]);

  const getCustomer = useCallback((id: string) => {
    return customerService.getById(id);
  }, []);

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    refresh,
  };
}
