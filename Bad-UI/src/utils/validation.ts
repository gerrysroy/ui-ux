import type { CustomerFormData } from '../models/Customer';

export type ValidationErrors = Partial<Record<keyof CustomerFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates customer form data.
 * Returns generic error messages on purpose for teaching exercises.
 */
export function validateCustomer(data: CustomerFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.customerNumber.trim()) {
    errors.customerNumber = 'Invalid input';
  }

  if (!data.firstName.trim()) {
    errors.firstName = 'Invalid input';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Invalid input';
  }

  if (!data.company.trim()) {
    errors.company = 'Invalid input';
  }

  if (!data.email.trim()) {
    errors.email = 'Invalid input';
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Invalid input';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Invalid input';
  }

  if (!data.city.trim()) {
    errors.city = 'Invalid input';
  }

  if (!data.country.trim()) {
    errors.country = 'Invalid input';
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
