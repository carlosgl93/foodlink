import { useAuthNew } from '@/hooks';
import RegistrarProveedorController from '../RegistrarProveedor/RegistrarProveedorController';
import Loading from '@/components/Loading';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { TextContainer } from '@/components/StyledComponents';
import { Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { formInputs } from '../RegistrarProveedor/formInputs';

export const CrearProveedor = () => {
  const { state, handleChange, handleSubmit } = RegistrarProveedorController();
  const { createProveedorLoading } = useAuthNew();

  if (createProveedorLoading) <Loading />;

  return (
    <>
      <Meta title="Registrar proveedor: FoodLink" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          maxWidth: { xs: 500, md: '50%' },
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          mb: '2rem',
          mx: 'auto',
        }}
      >
        <TextContainer>
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.4rem',
              my: '2.5vh',
              color: 'primary.main',
            }}
          >
            Crear cuenta para un proveedor
          </Typography>
        </TextContainer>
        <Box component={'form'} sx={{ width: '100%', gap: 2 }} onSubmit={handleSubmit}>
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
                !state.companyName || !state.email || !state.password || !state.confirmPassword
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '2.5vh',
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
};
