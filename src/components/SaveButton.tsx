import { Button } from '@mui/material';

export const SaveButton = () => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        marginTop: '2rem',
      }}
      type="submit"
    >
      Guardar
    </Button>
  );
};
