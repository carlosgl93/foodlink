import { ChangeEvent } from 'react';
import { List, ListItemButton, ListItemText, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValueLoadable } from 'recoil';

import {
  StyledSelect,
  StyledUnorderedList,
  StyledListItem,
  StyledCheckboxInput,
  Title,
} from '@/components/StyledComponents';
import FiltersSearchBar from './FiltersSearchBar';
import useRecibeApoyo from '@/store/recibeApoyo';
import { availability } from '@/utils/constants';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Especialidad, Servicio } from '@/types/Servicio';

type MobileFiltersProps = {
  closeFilters: () => void;
};

export const MobileFilters = ({ closeFilters }: MobileFiltersProps) => {
  const [
    { servicio, especialidad, comuna },
    { removeComuna, selectServicio, selectEspecialidad, setAvailability },
  ] = useRecibeApoyo();

  console.log('servicio from state', servicio);

  const fetchServicios = useRecoilValueLoadable(getAllServiciosAndEspecialidades);

  const serviciosAdEspecialidades = fetchServicios.contents.data;

  const servicios: Servicio[] =
    serviciosAdEspecialidades !== undefined ? Object?.values(serviciosAdEspecialidades) : [];

  const especialidades =
    servicios
      ?.find((s: Servicio) => s.service_id === servicio?.service_id)
      ?.especialidades.map((e: Especialidad) => e) || [];

  const handleSelectServicio = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedService = servicios.find((s: Servicio) => s.service_name === e.target.value);
    selectServicio(selectedService as Servicio);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        maxWidth: '80vw',
        p: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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

        <Button variant="outlined" onClick={closeFilters}>
          <CloseIcon />
        </Button>
      </Box>
      <FiltersSearchBar />
      {comuna && (
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
            <ListItemText primary={comuna.name} />
          </ListItemButton>
        </List>
      )}

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
          // todo fix bug: if there is no state (servicios === null)
          // the select should render "Selecciona un servicio"
          // but it always defaults to the first service.name in the array
          value={servicio?.service_name || ''}
          onChange={handleSelectServicio}
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
            value={especialidad?.especialidad_name}
            onChange={(e) => {
              const selectedEspecialidad = especialidades.find(
                (esp: Especialidad) => esp.especialidad_name === e.target.value,
              );
              selectEspecialidad(selectedEspecialidad as Especialidad);
            }}
          >
            {servicio.especialidades?.map((especialidad) => {
              return (
                <option key={especialidad.especialidad_id} value={especialidad.especialidad_name}>
                  {especialidad.especialidad_name}
                </option>
              );
            })}
          </StyledSelect>
        </>
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
