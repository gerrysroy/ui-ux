export type CustomerStatus = 'Active' | 'Inactive';

export interface Customer {
  id: string;
  customerNumber: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  status: CustomerStatus;
}

export type CustomerFormData = Omit<Customer, 'id'>;

export function createEmptyCustomer(): CustomerFormData {
  return {
    customerNumber: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    status: 'Active',
  };
}
