import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type AddButtonProps = {
  action: () => void;
};

export const AddButton = ({ action }: AddButtonProps) => {
  return (
    <IconButton color="primary" onClick={action}>
      <AddOutlined
        sx={{
          backgroundColor: 'primary.contrastText',
          borderRadius: '2.5rem',
          height: '2rem',
          width: '2rem',
        }}
      />
    </IconButton>
  );
};
