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

interface DeleteDialogProps {
  customer: Customer | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ customer, open, onConfirm, onCancel }: DeleteDialogProps) {
  if (!customer) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(_e, data) => {
        if (!data.open) onCancel();
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Kunde löschen?</DialogTitle>
          <DialogContent>
            Möchten Sie den Kunden{' '}
            <strong>{customer.firstName} {customer.lastName}</strong>{' '}
            (Nr. {customer.customerNumber}) wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden.
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onCancel}>
              Abbrechen
            </Button>
            <Button appearance="primary" onClick={onConfirm}>
              Löschen
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}