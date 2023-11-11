import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';

function SearchBarComponent() {
  function handleSearchByComuna(event: React.SyntheticEvent) {
    console.log(event);
    // TODO: IMPLEMENT SEARCH FUNCTIONALITY
    throw new Error('Function not implemented.');
  }

  return (
    <OutlinedInput
      id="searchByComuna"
      type={'text'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="buscar por comuna" onClick={handleSearchByComuna} edge="end">
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '3rem',
                height: '2.5rem',
                width: '2.5rem',
                padding: '0.25rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Search
                sx={{
                  color: 'white',
                }}
              />
            </Box>
          </IconButton>
        </InputAdornment>
      }
      placeholder="Indicanos tu comuna"
      sx={{
        width: {
          xs: '100%',
          sm: '80vw',
          md: '60vw',
          lg: '50vw',
        },
        backgroundColor: 'white',
        borderRadius: '2rem',
        mt: '1rem',
      }}
    />
  );
}

export default SearchBarComponent;
