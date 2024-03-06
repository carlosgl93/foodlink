import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import { Image } from '@/components/ImageContainer';
import { TextContainer, Title } from '@/components/StyledComponents';

import RegistrarPrestadorController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';

function RegistrarPrestador() {
  const { state, handleChange, handleSubmit, handleSelect } = RegistrarPrestadorController();
  const theme = useTheme();
  return (
    <>
      <Meta title="Registrar prestador de servicio Blui" />
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
            ¡Estas a un solo paso! Favor registrate para poder encontrar y contactar a la persona
            que buscas.
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
          {formInputs.map((input) => {
            if (input.inputName === 'comoEnteraste') {
              return (
                <select
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    marginTop: '1vh',
                  }}
                  key={input.inputName + input.label}
                  name={input.inputName}
                  onChange={handleSelect}
                  value={state.comoEnteraste}
                >
                  <option value="" disabled>
                    Como te enteraste de nosotros?
                  </option>
                  {input!.options!.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              );
            } else {
              return (
                <TextField
                  sx={{
                    m: {
                      xs: 1,
                      sm: 2,
                      md: 3,
                    },
                  }}
                  key={input.inputName}
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
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled={
                state.nombre === '' ||
                state.apellidos === '' ||
                state.telefono === '' ||
                state.correo === '' ||
                state.contrasena === '' ||
                state.confirmarContrasena === '' ||
                state.comoEnteraste === '' ||
                state.error !== ''
              }
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '5vh',
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RegistrarPrestador;
