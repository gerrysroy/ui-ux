import { Link } from 'react-router-dom';
import { Button, Divider, Toaster } from '@fluentui/react-components';
import { CustomerProvider } from '../hooks/CustomerContext';
import { APP_TOASTER_ID } from '../hooks/useAppToast';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CustomerProvider>
      <div className={styles.wrapper}>
        <Toaster toasterId={APP_TOASTER_ID} />
        <header className={styles.header}>
          <span className={styles.tinyTitle}>app</span>
          <nav className={styles.nav}>
            <Link to="/add">
              <Button appearance="primary" size="large" className={styles.navBtnGreen}>
                Add New
              </Button>
            </Link>
            <Link to="/">
              <Button appearance="secondary" size="small" className={styles.navBtn}>
                KUNDEN LISTE
              </Button>
            </Link>
            <span className={styles.navSpacer} />
            <Link to="/">
              <Button appearance="outline" size="medium" className={styles.navBtnRed}>
                Home
              </Button>
            </Link>
          </nav>
        </header>

        <p className={styles.welcomeText}>
          Willkommen! This application is used for managing customer records in our organisation.
          You can view all customers, add new entries, modify existing data, or remove records
          from the database. Please note that all changes are permanent and cannot be undone
          without administrator privileges. For support contact the IT department during office
          hours Monday through Friday 08:00–17:00 except public holidays.
        </p>

        <Divider className={styles.divider} />

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <small>© 2026</small>
          <span className={styles.footerBold}>CUSTOMER mgmt</span>
        </footer>
      </div>
    </CustomerProvider>
  );
}
