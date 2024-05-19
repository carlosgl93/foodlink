import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../SearchBar';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { useComunas } from '@/hooks';
import { venderSteps as steps } from './venderSteps';
import { VenderController } from './VenderController';
import { OffererDispatch } from '@/store/comienzo/vender';

const Step3 = () => {
  const { handleIncreaseStep, handleDecreaseStep, despacho, handleSelectDespacho } =
    VenderController();
  const { selectedComunas, handleRemoveComuna } = useComunas();

  return (
    <>
      <TextContainer
        sx={{
          maxWidth: { xs: '500px', md: '800px' },
          textAlign: 'center',
          mx: {
            xs: '5vw',
            md: 'auto',
          },
        }}
      >
        <Title
          variant="h1"
          sx={{
            fontSize: '2rem',
            my: '2.5vh',
          }}
        >
          {steps[2].title}
        </Title>
        <Text
          sx={{
            mx: { xs: '5vw', md: 'auto' },
            my: '1vh',
          }}
        >
          {steps[2].text}
        </Text>
        <FormControl
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
            onChange={(e) => handleSelectDespacho(e.target.value as OffererDispatch)}
            row
          >
            <FormControlLabel value="nacional" control={<Radio />} label="Nacional" />
            {/* <FormControlLabel value="regional" control={<Radio />} label="Regional" /> */}
            <FormControlLabel value="comunas" control={<Radio />} label="Especificar" />
          </RadioGroup>
        </FormControl>
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
      </TextContainer>
      <Box
        sx={{
          display: 'flex',
          my: '2.5vh',
          gap: '1rem',
        }}
      >
        <Button variant="contained" onClick={handleDecreaseStep}>
          Atras
        </Button>
        <Button
          disabled={despacho === 'nacional' ? false : !selectedComunas.length}
          variant="contained"
          onClick={handleIncreaseStep}
        >
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step3;
