import {
  StyledSelect,
  StyledUnorderedList,
  StyledListItem,
  StyledCheckboxInput,
  Title,
} from '@/components/StyledComponents';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import FiltersSearchBar from './FiltersSearchBar';
import useRecibeApoyo from '@/store/recibeApoyo';

import { services } from '@/store/recibeApoyo/services';
import { availability } from '@/utils/constants';

const DesktopFilters = () => {
  const [
    { servicio, especialidad, comunas },
    { removeComuna, selectServicio, selectEspecialidad, setAvailability },
  ] = useRecibeApoyo();
  const servicios = services;
  const especialidades = servicio ? servicios.find((s) => s.text === servicio)?.speciality : [];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Comunas
      </Title>
      <FiltersSearchBar />
      <List>
        {comunas.map((comuna) => {
          return (
            <ListItemButton
              onClick={() => removeComuna(comuna)}
              sx={{
                color: 'secondary.main',
                display: 'grid',
                gridTemplateColumns: '90% 10%',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'primary.dark',
                borderRadius: '0.25rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'primary.dark',
                ':hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.dark',
                },
                my: '1vh',
              }}
              key={comuna}
            >
              <ListItemText primary={comuna} />
            </ListItemButton>
          );
        })}
      </List>
      {/* SERVICIO */}
      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Servicio
      </Title>
      <StyledSelect
        // set the default selected value to the servicio from useRecibeApoyo
        value={servicio}
        onChange={(e) => selectServicio(e.target.value)}
      >
        {servicios.map((servicio) => {
          return (
            <option key={servicio.text} value={servicio.text}>
              {servicio.text}
            </option>
          );
        })}
      </StyledSelect>
      {/* ESPECIALIDAD */}

      {servicio && especialidades && (
        <>
          <Title
            variant="h6"
            sx={{
              fontSize: '1.2rem',
            }}
          >
            Especialidad
          </Title>
          <StyledSelect
            // set the default selected value to the servicio from useRecibeApoyo
            value={especialidad}
            onChange={(e) => selectEspecialidad(e.target.value)}
          >
            {servicio ? (
              especialidades?.map((especialidad) => {
                return (
                  <option key={especialidad.text} value={especialidad.text}>
                    {especialidad.text}
                  </option>
                );
              })
            ) : (
              <option>Selecciona una especialidad</option>
            )}
          </StyledSelect>
        </>
      )}

      {/* DISPONIBILIDAD */}
      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Disponibilidad
      </Title>
      <StyledUnorderedList>
        {availability.map((day) => {
          return (
            <StyledListItem key={day.id}>
              <StyledCheckboxInput
                type="checkbox"
                id={day.name}
                name="availability"
                value={day.name}
                onClick={() => setAvailability(day)}
              />
              <label htmlFor={day.name}>{day.name}</label>
            </StyledListItem>
          );
        })}
      </StyledUnorderedList>
    </Box>
  );
};

export default DesktopFilters;
