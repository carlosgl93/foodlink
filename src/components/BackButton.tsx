import { Button } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  to?: string;
  action?: (() => void | null) | undefined;
};

const BackButton = ({ to, action }: BackButtonProps) => {
  const router = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIosNewOutlinedIcon />}
      onClick={() => {
        if (action) {
          action();
        }
        to ? router(to) : router(-1);
      }}
      sx={{
        mb: '1rem',
      }}
    >
      Atras
    </Button>
  );
};

export default BackButton;
