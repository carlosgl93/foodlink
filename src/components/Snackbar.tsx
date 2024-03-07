import { notificationState } from '@/store/snackbar';
import { snackbarController } from '@/store/snackbar/useSnackbarController';
import { Alert, Snackbar } from '@mui/material';
import { useRecoilState } from 'recoil';

export const NotificationSnackbar = () => {
  const [notification] = useRecoilState(notificationState);
  const { open, message, severity } = notification;
  const { onClose } = snackbarController();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
