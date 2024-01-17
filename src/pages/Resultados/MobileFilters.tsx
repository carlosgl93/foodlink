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

  const fetchServicios = useRecoilValueLoadable(getAllServiciosAndEspecialidades);

  const serviciosAdEspecialidades = fetchServicios.contents.data;

  const servicios: Servicio[] =
    serviciosAdEspecialidades !== undefined ? Object?.values(serviciosAdEspecialidades) : [];

  const especialidades =
    servicios
      ?.find((s: Servicio) => s.service_id === servicio?.service_id)
      ?.especialidades.map((e: Especialidad) => e) || [];

  const handleSelectServicio = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      selectServicio(null);
      selectEspecialidad(null);
      return;
    }
    const selectedService = servicios.find((s: Servicio) => s.service_name === e.target.value);
    selectEspecialidad(null);
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
        <StyledSelect value={servicio?.service_name || ''} onChange={handleSelectServicio}>
          <option value={''}>Elige un servicio</option>

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
            <option value={''}>Elige una especialidad</option>

            {servicio.especialidades?.map((especialidad, i) => {
              if (especialidad.especialidad_name === servicio.service_name)
                return <option key={i}>Este servicio no tiene especialidad</option>;
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
