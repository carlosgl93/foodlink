import { IconButton, InputAdornment, OutlinedInput, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
// import { allComunas } from '@/utils/constants';
import { useState } from 'react';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Comuna } from '@/types/Comuna';

function FiltersSearchBar() {
  const [{ comuna, allComunas }, { addComuna, removeComuna }] = useRecibeApoyo();
  const [comunasState, setComunasState] = useState(allComunas);

  const clickComunaHandler = (_comuna: Comuna) => {
    if (comuna === _comuna) {
      removeComuna(comuna);
      setComunasState(allComunas);
    } else {
      addComuna(_comuna);
      setComunasState(allComunas);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const match = allComunas.filter((comuna: Comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    setComunasState(match);
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
        placeholder="Comunas"
        sx={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '2rem',
          mt: '1rem',
        }}
        onChange={onChangeHandler}
      />
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '5px',
          maxHeight: '10rem',
          overflow: 'auto',
        }}
      >
        {comunasState.length <= 5 &&
          comunasState.map((_comuna) => (
            <Box
              key={_comuna.id}
              sx={{
                px: '1rem',
                py: '1rem',
                borderBottom: '1px solid #ccc',
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }}
              onClick={() => clickComunaHandler(_comuna as Comuna)}
            >
              {_comuna.name}
            </Box>
          ))}
      </Box>
    </>
  );
}

export default FiltersSearchBar;
