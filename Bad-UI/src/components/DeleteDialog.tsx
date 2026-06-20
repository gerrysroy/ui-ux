import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components';
import type { Customer } from '../models/Customer';
import styles from './DeleteDialog.module.css';

interface DeleteDialogProps {
  customer: Customer | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ customer, open, onConfirm, onCancel }: DeleteDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={open}>
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogTitle className={styles.title}>???</DialogTitle>
          <DialogContent>
            <p className={styles.text}>
              Do you really want to do this? The record for{' '}
              <strong>{customer.lastName}</strong> might be removed. Or maybe not.
              Click a button below to continue. This action affects customer number{' '}
              {customer.customerNumber} located in {customer.city}.
            </p>
          </DialogContent>
          <DialogActions className={styles.actions}>
            <Button appearance="primary" onClick={onConfirm} className={styles.btnOk}>
              OK
            </Button>
            <Button appearance="secondary" onClick={onCancel} className={styles.btnCancel}>
              Cancel
            </Button>
            <Button appearance="outline" onClick={onConfirm} className={styles.btnDelete}>
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
