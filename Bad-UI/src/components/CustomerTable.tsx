import { useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import type { Customer } from '../models/Customer';
import { StatusDisplay } from './StatusDisplay';
import styles from './CustomerTable.module.css';

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (customer: Customer) => void;
}

export function CustomerTable({ customers, onDelete }: CustomerTableProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.colPhone}>Phone</th>
            <th className={styles.colCountry}>Country</th>
            <th className={styles.colFirst}>First Name</th>
            <th className={styles.colStatus}>Status</th>
            <th className={styles.colCompany}>Company</th>
            <th className={styles.colLast}>Last Name</th>
            <th className={styles.colEmail}>Email</th>
            <th className={styles.colNumber}>Nr.</th>
            <th className={styles.colCity}>City</th>
            <th className={styles.colActions}>actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className={styles.cellLeft}>{customer.phone}</td>
              <td className={styles.cellCenter}>{customer.country}</td>
              <td className={styles.cellRight}>{customer.firstName}</td>
              <td>
                <StatusDisplay status={customer.status} />
              </td>
              <td className={styles.cellCompany}>{customer.company}</td>
              <td>{customer.lastName}</td>
              <td className={styles.cellEmail}>{customer.email}</td>
              <td className={styles.cellNumber}>{customer.customerNumber}</td>
              <td>{customer.city}</td>
              <td className={styles.cellActions}>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => navigate(`/edit/${customer.id}`)}
                  className={styles.editBtn}
                >
                  bearbeiten
                </Button>
                <Button
                  size="large"
                  appearance="primary"
                  onClick={() => onDelete(customer)}
                  className={styles.deleteBtn}
                >
                  DEL
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
