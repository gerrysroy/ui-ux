import { Badge } from '@fluentui/react-components';
import type { CustomerStatus } from '../models/Customer';

interface StatusDisplayProps {
  status: CustomerStatus;
}

export function StatusDisplay({ status }: StatusDisplayProps) {
  const isActive = status === 'Active';

  return (
    <Badge appearance="filled" color={isActive ? 'success' : 'danger'}>
      {isActive ? 'Aktiv' : 'Inaktiv'}
    </Badge>
  );
}