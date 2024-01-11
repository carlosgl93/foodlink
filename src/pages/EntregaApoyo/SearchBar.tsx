import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useState } from 'react';
import useEntregaApoyo from '@/store/entregaApoyo';
import { Comuna } from '@/types/Comuna';

function SearchBar() {
  const [{ allComunas, selectedComunas }, { addComuna, removeComuna }] = useEntregaApoyo();
  const [comunasState, setComunasState] = useState(allComunas || []);

  console.log(selectedComunas);

  const clickComunaHandler = (comuna: Comuna) => {
    if (selectedComunas?.includes(comuna)) {
      removeComuna(comuna);
    } else {
      setComunasState(allComunas || []);
      addComuna(comuna);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const match = allComunas?.filter((comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    if (match) {
      setComunasState(match);
    }
  };

  if (allComunas && allComunas.length) {
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
          {comunasState?.length <= 5 &&
            comunasState?.map((comuna) => (
              <Box
                key={comuna.id}
                sx={{
                  px: '1rem',
                  py: '1rem',
                  borderBottom: '1px solid #ccc',
                  '&:hover': {
                    backgroundColor: '#ccc',
                  },
                }}
                onClick={() => clickComunaHandler(comuna)}
              >
                {comuna.name}
              </Box>
            ))}
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}

export default SearchBar;
