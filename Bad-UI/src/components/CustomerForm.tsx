import { useState } from 'react';
import {
  Button,
  Dropdown,
  Input,
  Option,
  Radio,
  RadioGroup,
  Spinner,
} from '@fluentui/react-components';
import type { CustomerFormData, CustomerStatus } from '../models/Customer';
import { hasValidationErrors, validateCustomer, type ValidationErrors } from '../utils/validation';
import { StatusDisplay } from './StatusDisplay';
import styles from './CustomerForm.module.css';

interface CustomerFormProps {
  initialData: CustomerFormData;
  submitLabel: string;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onCancel: () => void;
}

const countryOptions = [
  'Germany', 'Switzerland', 'France', 'Italy', 'Poland', 'United Kingdom',
  'Netherlands', 'Czech Republic', 'Spain', 'Austria', 'Sweden', 'Norway',
  'Portugal', 'Denmark', 'Belgium', 'Ireland', 'Greece', 'Hungary',
  'Slovakia', 'Cyprus',
];

export function CustomerForm({ initialData, submitLabel, onSubmit, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateField = <K extends keyof CustomerFormData>(field: K, value: CustomerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateCustomer(formData);
    setErrors(validationErrors);
    setSubmitted(true);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Firma</label>
        <Input
          value={formData.company}
          onChange={(_e, data) => updateField('company', data.value)}
          placeholder="Firma eingeben..."
        />
        {submitted && errors.company && <span className={styles.error}>{errors.company}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Kundennummer</label>
        <Input
          value={formData.customerNumber}
          onChange={(_e, data) => updateField('customerNumber', data.value)}
        />
        {submitted && errors.customerNumber && <span className={styles.error}>{errors.customerNumber}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Vorname</label>
        <Input
          value={formData.firstName}
          onChange={(_e, data) => updateField('firstName', data.value)}
        />
        {submitted && errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Nachname</label>
        <Input
          value={formData.lastName}
          onChange={(_e, data) => updateField('lastName', data.value)}
        />
        {submitted && errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>E-Mail</label>
        <Input
          value={formData.email}
          onChange={(_e, data) => updateField('email', data.value)}
          placeholder="email@example.com"
        />
        {submitted && errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Telefon</label>
        <Input
          value={formData.phone}
          onChange={(_e, data) => updateField('phone', data.value)}
          placeholder="+41 ..."
        />
        {submitted && errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Ort</label>
        <Input
          value={formData.city}
          onChange={(_e, data) => updateField('city', data.value)}
        />
        {submitted && errors.city && <span className={styles.error}>{errors.city}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Land</label>
        <Dropdown
          value={formData.country}
          selectedOptions={formData.country ? [formData.country] : []}
          onOptionSelect={(_e, data) => updateField('country', data.optionValue ?? '')}
        >
          {countryOptions.map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Dropdown>
        {submitted && errors.country && <span className={styles.error}>{errors.country}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Status</label>
        <RadioGroup
          value={formData.status}
          onChange={(_e, data) => updateField('status', data.value as CustomerStatus)}
          layout="horizontal"
        >
          <Radio value="Active" label="Aktiv" />
          <Radio value="Inactive" label="Inaktiv" />
        </RadioGroup>
        <StatusDisplay status={formData.status} />
      </div>

      {submitted && hasValidationErrors(errors) && (
        <p className={styles.globalError}>Einige Felder enthalten Fehler. Bitte prüfen Sie Ihre Eingaben.</p>
      )}

      <div className={styles.actions}>
        <Button
          appearance="primary"
          size="large"
          onClick={handleSubmit}
          disabled={isSaving}
          icon={isSaving ? <Spinner size="tiny" /> : undefined}
        >
          {isSaving ? 'Speichern…' : submitLabel}
        </Button>
        <Button appearance="secondary" size="large" onClick={onCancel} disabled={isSaving}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}