import { createContext, useContext, type ReactNode } from 'react';
import { useCustomers } from '../hooks/useCustomers';

type CustomerContextValue = ReturnType<typeof useCustomers>;

const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const value = useCustomers();
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomerContext(): CustomerContextValue {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within CustomerProvider');
  }
  return context;
}
