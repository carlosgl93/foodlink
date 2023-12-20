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

import { availability } from '@/utils/constants';
import { useRecoilValueLoadable } from 'recoil';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Especialidad, Servicio } from '@/types/Servicio';

const DesktopFilters = () => {
  const [
    { servicio, especialidad, comuna },
    { removeComuna, selectServicio, selectEspecialidad, setAvailability },
  ] = useRecibeApoyo();

  const fetchServicios = useRecoilValueLoadable(getAllServiciosAndEspecialidades);

  const serviciosAdEspecialidades = fetchServicios.contents.data;

  const servicios: Servicio[] =
    serviciosAdEspecialidades !== undefined ? Object?.values(serviciosAdEspecialidades) : [];
  const especialidades =
    servicios
      ?.find((s: Servicio) => s.service_id === servicio?.service_id)
      ?.especialidades.map((e: Especialidad) => e) || [];

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
        <ListItemButton
          onClick={() => removeComuna(comuna!)}
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
        >
          <ListItemText primary={comuna ? comuna.name : 'Selecciona una comuna'} />
        </ListItemButton>
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
      {servicios && (
        <StyledSelect
          value={servicio?.service_name}
          // how can i pass the servicio to the selectServicio function?
          onChange={(e) => {
            const selectedService = servicios.find(
              (s: Servicio) => s.service_name === e.target.value,
            );
            selectServicio(selectedService as Servicio);
          }}
        >
          {servicios.map((servicio: Servicio) => {
            return (
              <option key={servicio.service_id} value={servicio.service_name}>
                {servicio.service_name}
              </option>
            );
          })}
        </StyledSelect>
      )}

      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Especialidad
      </Title>
      {especialidades && (
        <StyledSelect
          // set the default selected value to the servicio from useRecibeApoyo
          value={especialidad}
          onChange={(e) => selectEspecialidad(e.target.value)}
        >
          {servicio ? (
            servicio.especialidades?.map((especialidad) => {
              return (
                <option key={especialidad.especialidad_id} value={especialidad.especialidad_name}>
                  {especialidad.especialidad_name}
                </option>
              );
            })
          ) : (
            <option>Selecciona un servicio</option>
          )}
        </StyledSelect>
      )}

      {/* ESPECIALIDAD */}

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
