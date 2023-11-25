import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { comunas } from '@/utils/constants';
import { useState } from 'react';

function SearchBar() {
  const [comunasState, setComunasState] = useState(comunas);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const match = comunas.filter((comuna) => {
      if (comuna.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    setComunasState(match);
  };

  const clickComunaHandler = () => {
    // TODO: IMPLEMENT COMUNA HANDLER
    console.log('handler comuna');
  };

  return (
    <>
      <OutlinedInput
        id="searchByComuna"
        type={'text'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="buscar por comuna" edge="end">
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
            xs: '80%',
            sm: '80vw',
            md: '60vw',
            lg: '50vw',
          },

          backgroundColor: 'white',
          borderRadius: '2rem',
          mt: '1rem',
        }}
        onChange={onChangeHandler}
      />
      <Box
        sx={{
          width: {
            xs: '80%',
            sm: '80vw',
            md: '60vw',
            lg: '50vw',
          },
          backgroundColor: 'white',
          borderRadius: '5px',
          maxHeight: '10rem',
          overflow: 'auto',
        }}
      >
        {comunasState.length <= 5 &&
          comunasState.map((comuna) => (
            <Box
              key={comuna}
              sx={{
                px: '1rem',
                py: '1rem',
                borderBottom: '1px solid #ccc',
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }}
              onClick={clickComunaHandler}
            >
              {comuna}
            </Box>
          ))}
      </Box>
    </>
  );
}

export default SearchBar;
