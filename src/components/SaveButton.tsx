import { Button } from '@mui/material';

type SaveButtonProps = {
  disabled?: boolean;
};

export const SaveButton = ({ disabled }: SaveButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        marginTop: '2rem',
      }}
      type="submit"
      disabled={disabled}
    >
      Guardar
    </Button>
  );
};
