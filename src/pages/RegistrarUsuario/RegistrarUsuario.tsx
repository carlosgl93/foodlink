import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import RegistrarUsuarioController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';
import { useAuthNew } from '@/hooks/useAuthNew';
import { Link } from 'react-router-dom';
import { useComunas } from '@/hooks';
import SearchBar from '../RecibeApoyo/SearchBar';

function RegistrarUsuario() {
  const { state, handleChange, handleSubmit } = RegistrarUsuarioController();
  const { selectedComunas } = useComunas();
  const [user] = useAuth();
  const theme = useTheme();

  const { createUserLoading } = useAuthNew();

  if (user.loading) return <Loading />;

  return (
    <>
      <Meta title="Registrar usuario FoodLink" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          maxWidth: 500,
          textAlign: 'center',
          mb: '2rem',
        }}
      >
        <TextContainer>
          <Title
            sx={{
              fontSize: '1.4rem',
              my: '2.5vh',
            }}
          >
            ¡Estas a un solo paso! Registrate para poder contactar al proveedor que buscas.
          </Title>
        </TextContainer>
        <Box
          component={'form'}
          sx={{ width: '100%', gap: theme.spacing(2) }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: 'row',
            }}
          >
            <Text sx={{ fontSize: '0.8rem', width: '100%', textAlign: 'center', mb: '0.5rem' }}>
              Ya tienes una cuenta? {'  '}
              <Link to="/ingresar">Ingresa aqui</Link>
            </Text>
          </Box>
          {state.error && (
            <TextContainer>
              <Typography
                variant="body1"
                sx={{
                  color: 'red',
                }}
              >
                {state.error}
              </Typography>
            </TextContainer>
          )}
          {formInputs.map((input, i) => {
            if (!selectedComunas.length && input.inputName === 'comuna') {
              return <SearchBar key={i} />;
            } else {
              return (
                <TextField
                  sx={{
                    m: {
                      xs: 2,
                      sm: 5,
                      md: 3,
                    },
                  }}
                  key={i}
                  label={input.label}
                  name={input.inputName}
                  variant="outlined"
                  placeholder={input.placeholder}
                  onChange={handleChange}
                  type={input.type}
                />
              );
            }
          })}
          {/* TODO: ADD CAPTCHA */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {user.error && (
              <Box>
                <Text
                  sx={{
                    color: 'red',
                  }}
                >
                  {user.error}
                </Text>
              </Box>
            )}
            <Button
              disabled={
                state.representativeName === '' ||
                state.confirmPassword === '' ||
                state.companyName === '' ||
                state.companyRut === '' ||
                state.password === '' ||
                state.phone === '' ||
                state.email === '' ||
                state.password === '' ||
                createUserLoading
              }
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '2.5vh',
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RegistrarUsuario;
