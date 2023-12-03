import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Service } from '@/utils/constants';

type ListProps = {
  items: Service[];
};

const ServiceTypeList = ({ items }: ListProps) => {
  const [{ servicio }, { selectServicio }] = useRecibeApoyo();

  const handleSelectServicio = (servicio: string) => {
    selectServicio(servicio);
  };

  console.log(servicio);

  return (
    <>
      <List
        sx={{
          gap: 1,
        }}
      >
        {items.map((item) => {
          const alreadySelected = servicio.includes(item.text);
          return (
            <ListItemButton
              onClick={() => handleSelectServicio(item.text)}
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
              key={item.text}
            >
              <ListItemText primary={item.text} />
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
