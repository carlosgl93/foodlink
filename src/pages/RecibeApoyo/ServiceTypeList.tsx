import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useRecoilValueLoadable } from 'recoil';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Servicio } from '@/types/Servicio';
import Loading from '@/components/Loading';

const ServiceTypeList = () => {
  const [{ servicio }, { selectServicio }] = useRecibeApoyo();

  const servicios = useRecoilValueLoadable(getAllServiciosAndEspecialidades);
  const handleSelectServicio = (servicio: Servicio) => {
    selectServicio(servicio);
  };

  console.log(servicios);

  switch (servicios.state) {
    case 'hasValue':
      return (
        <>
          <List
            sx={{
              gap: 1,
            }}
          >
            {(Object.values(servicios.contents?.data) as Servicio[]).map((item: Servicio) => {
              const alreadySelected = servicio?.service_name.includes(item.service_name);
              return (
                <ListItemButton
                  onClick={() => handleSelectServicio(item)}
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
                  key={item.service_id}
                >
                  <ListItemText primary={item.service_name} />
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
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <>There was an error</>;
  }
};

export default ServiceTypeList;
