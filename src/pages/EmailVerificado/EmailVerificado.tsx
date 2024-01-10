import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FullSizeCenteredFlexBox } from '@/components/styled';
import { verifyUser } from '@/api/verificar-usuario/verificarUsuario';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';

type Severity = 'success' | 'info' | 'warning' | 'error';

const EmailVerificado = () => {
  const [notification, setNotification] = useRecoilState(notificationState);

  const router = useNavigate();

  const params = useLocation();
  const query = new URLSearchParams(params.search);
  const token = query.get('token') || '';

  useEffect(() => {
    verifyUser(token)
      .then((res) => {
        if (res) {
          if (res.status === 'success') {
            console.log('exito');
            setNotification({
              ...notification,
              open: true,
              message: res!.message,
              severity: res!.status as Severity,
            });
            router(`/perfil-usuario/${res.user.id}`);
          } else {
            throw new Error(res.message);
          }
        }
      })
      .catch((err) => {
        console.log('failed');
        console.log(err);
        setNotification({
          ...notification,
          open: true,
          message: err!.message + '. Por favor, ingrese nuevamente',
          severity: 'error',
        });
        router('/ingresar');
      });
  });

  return (
    <FullSizeCenteredFlexBox
      sx={{
        flexDirection: 'column',
      }}
    >
      <h1> Email Verificado </h1>
      <div>
        <p>Correo electrónico verificado correctamente.</p>
      </div>
    </FullSizeCenteredFlexBox>
  );
};

export default EmailVerificado;
