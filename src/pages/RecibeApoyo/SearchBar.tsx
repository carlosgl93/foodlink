import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getAllComunas } from '@/api/comunas/getAllComunas';
import { useRecoilValueLoadable } from 'recoil';
import Loading from '@/components/Loading';
import { Comuna } from '@/types/Comuna';

function SearchBar() {
  const [{ comuna, allComunas }, { addComuna, removeComuna, setComunas }] = useRecibeApoyo();
  const [comunasState, setComunasState] = useState<Comuna[]>([]);

  const comunasFetched = useRecoilValueLoadable(getAllComunas);

  console.log(comunasFetched);

  useEffect(() => {
    if (comunasFetched.state === 'hasValue') {
      setComunas(comunasFetched.contents?.data);
    }
  }, [comunasFetched, setComunas]);

  const clickComunaHandler = (c: Comuna) => {
    const textInput = document.getElementById('searchByComuna') as HTMLInputElement;
    if (comuna === c) {
      removeComuna(c);
    } else {
      addComuna(c);
      setComunasState(comunasFetched.contents.data);
      textInput.value = '';
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

  switch (comunasFetched.state) {
    case 'hasValue':
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
              comunasState.map((comuna) => (
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
    case 'loading': {
      return <Loading />;
    }
    case 'hasError': {
      return (
        <Box>
          <p>There was an error, please try again later</p>
        </Box>
      );
    }
  }
}

export default SearchBar;
