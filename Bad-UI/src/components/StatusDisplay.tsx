import type { CustomerStatus } from '../models/Customer';
import styles from './StatusDisplay.module.css';

interface StatusDisplayProps {
  status: CustomerStatus;
  variant?: 'list' | 'form' | 'inline';
}

/**
 * Displays customer status with intentionally inconsistent coloring.
 */
export function StatusDisplay({ status, variant = 'list' }: StatusDisplayProps) {
  const isActive = status === 'Active';

  if (variant === 'form') {
    return (
      <span className={isActive ? styles.formSuccess : styles.formWarning}>
        {status}
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={isActive ? styles.inlineGreen : styles.inlineRed}>
        {isActive ? 'OK' : 'ERROR'}
      </span>
    );
  }

  return (
    <span className={isActive ? styles.textActive : styles.textInactive}>
      {status}
    </span>
  );
}
