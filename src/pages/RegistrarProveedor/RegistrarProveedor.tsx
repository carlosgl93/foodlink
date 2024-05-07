import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { TextContainer, Title } from '@/components/StyledComponents';
import { formInputs } from './formInputs';
import { useAuthNew } from '@/hooks/useAuthNew';
import RegistrarProveedorController from './RegistrarProveedorController';
import Loading from '@/components/Loading';

function RegistrarProveedor() {
  const { state, handleChange, handleSubmit } = RegistrarProveedorController();
  const { createProveedorLoading } = useAuthNew();
  const theme = useTheme();

  if (createProveedorLoading) <Loading />;

  return (
    <>
      <Meta title="Registrar proveedor: FoodLink" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          maxWidth: { xs: 500, md: '35%' },
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          mb: '2rem',
          mx: 'auto',
        }}
      >
        <TextContainer>
          <Title
            sx={{
              fontSize: '1.4rem',
              my: '2.5vh',
            }}
          >
            ¡Estas a un solo paso! Registrate para poder ofrecer tus productos.
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
            if (input.inputName === 'dispatch') return;
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
                helperText={input?.helperText ?? ''}
              />
            );
            // }
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
                false
                // state.nombre === '' ||
                // state.apellido === '' ||
                // state.telefono === '' ||
                // state.email === '' ||
                // state.password === '' ||
                // state.confirmPassword === '' ||
                // state.error !== ''
                // createProveedorLoading
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '5vh',
              }}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RegistrarProveedor;
