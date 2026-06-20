import { useState } from 'react';
import {
  Button,
  Dropdown,
  Input,
  Option,
  Radio,
  RadioGroup,
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
      <div className={styles.rowWide}>
        <Input
          value={formData.company}
          onChange={(_e, data) => updateField('company', data.value)}
          placeholder="Firma eingeben..."
          className={styles.inputWide}
        />
        <span className={styles.labelBelow}>COMPANY NAME</span>
        {submitted && errors.company && <span className={styles.error}>{errors.company}</span>}
      </div>

      <div className={styles.rowSplit}>
        <div className={styles.fieldGroup}>
          <span className={styles.labelAbove}>customer number</span>
          <Input
            value={formData.customerNumber}
            onChange={(_e, data) => updateField('customerNumber', data.value)}
            className={styles.inputNarrow}
          />
          {submitted && errors.customerNumber && <span className={styles.errorSmall}>{errors.customerNumber}</span>}
        </div>

        <div className={styles.fieldGroupRight}>
          <Input
            value={formData.phone}
            onChange={(_e, data) => updateField('phone', data.value)}
            placeholder="+49 ..."
            className={styles.inputMedium}
          />
          <span className={styles.labelBelow}>Telefon</span>
          {submitted && errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
      </div>

      <div className={styles.rowTriple}>
        <div>
          <Input
            value={formData.lastName}
            onChange={(_e, data) => updateField('lastName', data.value)}
            placeholder="Nachname"
            className={styles.inputSmall}
          />
          {submitted && errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>

        <div className={styles.fieldMiddle}>
          <span className={styles.labelInline}>Vorname / First Name</span>
          <Input
            value={formData.firstName}
            onChange={(_e, data) => updateField('firstName', data.value)}
            className={styles.inputLarge}
          />
          {submitted && errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>

        <div className={styles.fieldEmail}>
          <Input
            value={formData.email}
            onChange={(_e, data) => updateField('email', data.value)}
            placeholder="email@example.com"
            className={styles.inputEmail}
          />
          {submitted && errors.email && <span className={styles.errorRed}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.rowLocation}>
        <div className={styles.cityBlock}>
          <span className={styles.labelTiny}>city</span>
          <Input
            value={formData.city}
            onChange={(_e, data) => updateField('city', data.value)}
            className={styles.inputCity}
          />
          {submitted && errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>

        <div className={styles.countryBlock}>
          <Dropdown
            value={formData.country}
            selectedOptions={formData.country ? [formData.country] : []}
            onOptionSelect={(_e, data) => updateField('country', data.optionValue ?? '')}
            className={styles.dropdown}
          >
            {countryOptions.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Dropdown>
          <span className={styles.labelBelow}>Land</span>
          {submitted && errors.country && <span className={styles.error}>{errors.country}</span>}
        </div>
      </div>

      <div className={styles.statusSection}>
        <p className={styles.statusHelp}>
          Please select whether this customer account should be considered active or inactive
          in the system. Active customers can receive invoices. Inactive customers are archived.
        </p>
        <RadioGroup
          value={formData.status}
          onChange={(_e, data) => updateField('status', data.value as CustomerStatus)}
          layout="horizontal"
        >
          <Radio value="Active" label="Active" />
          <Radio value="Inactive" label="Inactive" />
        </RadioGroup>
        <StatusDisplay status={formData.status} variant="form" />
        <StatusDisplay status={formData.status} variant="inline" />
      </div>

      {submitted && hasValidationErrors(errors) && (
        <p className={styles.globalError}>Some fields contain errors. Please check your input.</p>
      )}

      <div className={styles.actions}>
        <Button
          appearance="primary"
          size="large"
          onClick={handleSubmit}
          disabled={isSaving}
          className={styles.btnSubmit}
        >
          {submitLabel}
        </Button>
        <Button appearance="secondary" size="small" onClick={onCancel} className={styles.btnCancel}>
          Cancel
        </Button>
        <Button appearance="outline" size="medium" onClick={handleSubmit} disabled={isSaving} className={styles.btnStore}>
          Store
        </Button>
      </div>
    </div>
  );
}
