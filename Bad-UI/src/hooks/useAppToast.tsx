import { Toast, ToastTitle, useToastController } from '@fluentui/react-components';

export const APP_TOASTER_ID = 'app-toaster';

type ToastIntent = 'success' | 'error' | 'info' | 'warning';

export function useAppToast() {
  const { dispatchToast } = useToastController(APP_TOASTER_ID);

  return (message: string, intent: ToastIntent = 'success') => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { intent },
    );
  };
}