import { Button } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  to?: string;
};

const BackButton = ({ to }: BackButtonProps) => {
  const router = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIosNewOutlinedIcon />}
      onClick={() => (to ? router(to) : router(-1))}
      sx={{
        mb: '1rem',
      }}
    >
      Atras
    </Button>
  );
};

export default BackButton;
