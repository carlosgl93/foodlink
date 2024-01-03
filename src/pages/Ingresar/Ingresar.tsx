import { useState } from 'react';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Text, Title } from '@/components/StyledComponents';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';

function Ingresar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, { login }] = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  if (user.loading) return <Loading />;

  return (
    <>
      <Meta title="Inicia Sesion" />
      <FullSizeCenteredFlexBox>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 400,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Title
            variant="h3"
            sx={{
              mb: 10,
            }}
          >
            Inicia sesion
          </Title>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Ingresar
          </Button>

          <Typography variant="body2" mt={2}>
            Aun no tienes una cuenta? <Link to="/registrar-usuario">Creala aqui</Link>
          </Typography>

          <Box>
            <Text
              sx={{
                color: 'red',
              }}
            >
              {user.error}
            </Text>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Ingresar;
