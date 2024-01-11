import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useEntregaApoyo from '@/store/entregaApoyo';
import { Servicio } from '@/types/Servicio';

const ServiceTypeList = () => {
  const [{ selectedServicio, allServicios }, { selectServicio }] = useEntregaApoyo();

  const handleSelectServicio = (servicio: Servicio) => {
    console.log(servicio);
    selectServicio(servicio);
  };

  return (
    <>
      <List
        sx={{
          gap: 1,
        }}
      >
        {allServicios?.map((servicio) => {
          const alreadySelected = selectedServicio === servicio;
          return (
            <ListItemButton
              onClick={() => handleSelectServicio(servicio)}
              sx={{
                color: alreadySelected ? 'secondary.main' : 'primary.main',
                display: 'grid',
                gridTemplateColumns: '90% 10%',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'primary.dark',
                borderRadius: '0.25rem',
                minWidth: '300px',
                padding: '0.5rem 1rem',
                backgroundColor: alreadySelected ? 'primary.dark' : 'white',
                ':hover': {
                  backgroundColor: alreadySelected ? 'primary.dark' : 'primary.light',
                  color: alreadySelected ? 'white' : 'primary.dark',
                },
              }}
              key={servicio.service_id}
            >
              <ListItemText primary={servicio.service_name} />
              <ListItemIcon
                sx={{
                  color: 'primary.main',
                  marginLeft: 'auto',
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};

export default ServiceTypeList;
