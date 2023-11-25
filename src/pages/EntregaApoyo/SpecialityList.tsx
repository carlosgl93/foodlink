import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useEntregaApoyo from '@/store/entregaApoyo';

type ListProps = {
  items: string[];
};

const SpecialityList = ({ items }: ListProps) => {
  const [{ selectedEspecialidad }, { selectEspecialidad }] = useEntregaApoyo();

  const handleSelectEspecialidad = (especialidad: string) => {
    selectEspecialidad(especialidad);
  };

  return (
    <>
      <List
        sx={{
          gap: 1,
        }}
      >
        {items.map((item) => {
          const alreadySelected = selectedEspecialidad === item;
          return (
            <ListItemButton
              onClick={() => handleSelectEspecialidad(item)}
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
                  color: alreadySelected ? 'white' : 'white',
                },
              }}
              key={item}
            >
              <ListItemText primary={item} />
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

export default SpecialityList;
