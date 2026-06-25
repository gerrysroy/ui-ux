import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider } from '@fluentui/react-components';
import { CustomerTable } from '../components/CustomerTable';
import { DeleteDialog } from '../components/DeleteDialog';
import { useCustomerContext } from '../hooks/CustomerContext';
import type { Customer } from '../models/Customer';
import styles from './CustomerListPage.module.css';
import { useAppToast } from '../hooks/useAppToast';

export function CustomerListPage() {
  const { customers, deleteCustomer } = useCustomerContext();
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const showToast = useAppToast();

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (customerToDelete) {
      await deleteCustomer(customerToDelete.id);
      showToast('Kunde gelöscht', 'success');
    }
    setDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setCustomerToDelete(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>data</h2>
        <span className={styles.count}>{customers.length} Einträge</span>
        <Link to="/add">
          <Button appearance="outline" size="small" className={styles.addLink}>
            + neu
          </Button>
        </Link>
      </div>

      <Card className={styles.infoCard}>
        <p className={styles.infoText}>
          <b>HINWEIS:</b> The following table shows ALL customer records currently stored in the
          application memory. Columns may appear in arbitrary order. To modify a record click
          the edit button. Deletion requires confirmation. Status values are displayed as plain
          text. No sorting or filtering is available at this time.
        </p>
      </Card>

      <Divider className={styles.divider} />

      <div className={styles.statsRow}>
        <span className={styles.statActive}>
          Active: {customers.filter((c) => c.status === 'Active').length}
        </span>
        <span className={styles.statInactive}>
          Inactive: {customers.filter((c) => c.status === 'Inactive').length}
        </span>
        <span className={styles.statTotal}>TOTAL = {customers.length}</span>
      </div>

      <CustomerTable customers={customers} onDelete={handleDeleteClick} />

      <DeleteDialog
        customer={customerToDelete}
        open={dialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
