import { useRecoilState } from 'recoil';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { notificationState } from '../../store/snackbar';

const Notifier = () => {
  const [notification, setNotification] = useRecoilState(notificationState);

  const handleClose = () => {
    setNotification({ ...notification, open: false, severity: 'info' });
  };

  const { open, message, severity } = notification;

  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
      <Alert severity={severity as AlertColor}>{message}</Alert>
    </Snackbar>
  );
};

export default Notifier;
