import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Image } from '@/components/ImageContainer';
import { Text, TextContainer, Title } from '@/components/StyledComponents';

import RegistrarUsuarioController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';
import { ComunaSearchbar } from './ComunaSearchbar';
import { tablet } from '@/theme/breakpoints';
import useRecibeApoyo from '@/store/recibeApoyo';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';

function RegistrarUsuario() {
  const [{ forWhom }] = useRecibeApoyo();
  const { state, handleChange, handleSubmit } = RegistrarUsuarioController();
  const [user] = useAuth();
  const theme = useTheme();
  const isTablet = useMediaQuery(tablet);

  console.log('user from registrar', user);

  const resetPatientName = () => {
    // search for the input with name nombrePaciente and reset its value
    // if (forWhom === '') {
    // }
    const input = document.querySelector('input[name="nombrePaciente"]') as HTMLInputElement;
    console.log(input);
    if (input) {
      input.value = '';
    }
  };

  if (user.loading) return <Loading />;

  return (
    <>
      <Meta title="Registrar usuario Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          maxWidth: 500,
          textAlign: 'center',
          margin: '5vh auto',
        }}
      >
        <Box>
          <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 125,
              height: 'auto',
            }}
          />
        </Box>
        <TextContainer>
          <Title
            sx={{
              fontSize: '1.4rem',
              my: '2.5vh',
            }}
          >
            ¡Estas a un solo paso! Registrate para poder contactar a la persona que buscas.
          </Title>
        </TextContainer>
        <Box
          component={'form'}
          sx={{ width: '100%', gap: theme.spacing(2) }}
          onSubmit={handleSubmit}
        >
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
            if (input.inputName === 'comuna') {
              return <ComunaSearchbar key={i} isTablet={isTablet} />;
            } else if (forWhom && input.inputName === 'paciente') {
              return (
                <TextField
                  sx={{
                    m: {
                      xs: 1,
                      sm: 2,
                      md: 3,
                    },
                  }}
                  key={i}
                  label={input.label}
                  name={'nombrePaciente'}
                  variant="outlined"
                  onChange={handleChange}
                  type={input.type}
                  value={forWhom && state.nombrePaciente === '' ? forWhom : state.nombrePaciente}
                  onClick={() => resetPatientName()}
                />
              );
            } else {
              return (
                <TextField
                  sx={{
                    m: {
                      xs: 3.5,
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
                state.nombre === '' ||
                state.apellido === '' ||
                state.correo === '' ||
                state.contrasena === '' ||
                state.confirmarContrasena === '' ||
                state.error !== '' ||
                state.rut === ''
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
