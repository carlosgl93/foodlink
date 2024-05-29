import { Box, Container, InputLabel, TextField } from '@mui/material';
import { createProductInputs } from './createProductInputs';
import { ProductsController } from './ProductsController';
import { SaveButton } from '@/components/SaveButton';

export const CreateProduct = () => {
  const { createProduct, handleChange, handleSubmit } = ProductsController();

  return (
    <Container component="form" onSubmit={handleSubmit}>
      {createProductInputs.map(({ label, type }) => (
        <Box
          key={label}
          sx={{
            maxWidth: '80vw',
            margin: '1rem auto',
          }}
        >
          {type === 'file' && <InputLabel>Imagen</InputLabel>}
          <TextField
            required={label === 'Nombre' || label === 'Precio'}
            fullWidth
            name={label.toLowerCase()}
            label={type === 'file' ? null : label}
            type={type}
            value={type === 'file' ? undefined : createProduct[label.toLowerCase()]}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      ))}
      <SaveButton disabled={!createProduct.nombre || !createProduct.precio} />
    </Container>
  );
};
