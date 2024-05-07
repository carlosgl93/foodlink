import { List, ListItemIcon, ListItemText } from '@mui/material';
import { ComprarController } from './ComprarController';
import { Certification } from '@/store/comienzo/comprar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledListItemButton } from './ComprarStyled';

type CertificationsListProps = {
  options: Certification[];
};

export const CertificationsList = ({ options }: CertificationsListProps) => {
  const { certifications, handleSelectCertifications } = ComprarController();

  return (
    <>
      <List
        sx={{
          width: {
            xs: '100%',
            md: 'fit-content',
          },
        }}
      >
        {options.map((item) => {
          const alreadySelected = certifications.find((i) => i.id === item.id);
          return (
            <StyledListItemButton
              onClick={() => handleSelectCertifications(item)}
              sx={{
                color: alreadySelected ? 'white' : 'primary.main',
                backgroundColor: alreadySelected ? 'primary.dark' : 'white',
                my: '0.5rem',

                ':hover': {
                  backgroundColor: alreadySelected ? 'primary.dark' : 'primary.light',
                  color: alreadySelected ? 'white' : 'primary.dark',
                },
              }}
              key={item.name}
            >
              <ListItemText primary={item.name} />
              <ListItemIcon
                sx={{
                  color: 'primary.main',
                  marginLeft: 'auto',
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </StyledListItemButton>
          );
        })}
      </List>
    </>
  );
};
