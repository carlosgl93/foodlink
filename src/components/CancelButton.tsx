import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';

type CancelButtonProps = {
  action: () => void;
};

export const CancelButton = ({ action }: CancelButtonProps) => {
  return (
    <IconButton color="primary" onClick={action}>
      <CloseOutlinedIcon
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
