import { useAuthNew, useComunas } from '@/hooks';
import RegistrarProveedorController from '../RegistrarProveedor/RegistrarProveedorController';
import Loading from '@/components/Loading';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { TextContainer, Title } from '@/components/StyledComponents';
import {
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  Radio,
  RadioGroup,
  Box,
} from '@mui/material';
import { formInputs } from '../RegistrarProveedor/formInputs';
import { offererDispatch, offererDispatchState } from '@/store/comienzo/vender';
import SearchBar from '../Comenzar/SearchBar';
import { useRecoilValue } from 'recoil';
import { VenderController } from '../Comenzar/Vender/VenderController';
import CloseIcon from '@mui/icons-material/Close';

export const CrearProveedor = () => {
  const { state, handleChange, handleSubmit } = RegistrarProveedorController();
  const { createProveedorLoading } = useAuthNew();
  const { handleSelectDespacho } = VenderController();
  const despacho = useRecoilValue(offererDispatchState);
  const { selectedComunas, handleRemoveComuna } = useComunas();

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
            if (input.inputName === 'dispatch') {
              return (
                <FormControl
                  key={input.inputName}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    gap: '1rem',
                  }}
                >
                  <FormLabel id="despacho-select-radio">Despacho</FormLabel>
                  <RadioGroup
                    aria-labelledby="despacho-select-radio"
                    name="controlled-radio-buttons-group"
                    value={despacho}
                    onChange={(e) => handleSelectDespacho(e.target.value as offererDispatch)}
                    row
                  >
                    <FormControlLabel value="nacional" control={<Radio />} label="Nacional" />
                    {/* <FormControlLabel value="regional" control={<Radio />} label="Regional" /> */}
                    <FormControlLabel value="comunas" control={<Radio />} label="Especificar" />
                  </RadioGroup>
                </FormControl>
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
                  helperText={input?.helperText ?? ''}
                />
              );
            }
          })}
          {despacho === 'comunas' && (
            <Box>
              <Title
                variant="h6"
                sx={{
                  fontSize: '1.1rem',
                }}
              >
                Comuna seleccionada:
              </Title>
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  maxWidth: '600px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                {selectedComunas &&
                  selectedComunas.map((comuna) => (
                    <ListItemButton
                      key={comuna.id}
                      onClick={() => handleRemoveComuna(comuna)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: '0.5rem',
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        maxWidth: 'fit-content',
                      }}
                    >
                      {comuna.name}
                      <CloseIcon sx={{ marginLeft: '0.5rem' }} />
                    </ListItemButton>
                  ))}
              </List>
              <SearchBar />
            </Box>
          )}
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
