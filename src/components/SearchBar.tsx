import { IconButton, InputAdornment, List, ListItem, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { allComunas } from '@/utils/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [comunasState, setComunasState] = useState(allComunas);
  const router = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const match = allComunas.filter((comuna) => {
      if (comuna.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    setComunasState(match);
  };

  const clickComunaHandler = (comuna: string) => {
    // TODO: IMPLEMENT COMUNA HANDLER
    console.log(comuna);
    console.log('handler comuna');
    setComunasState(allComunas);
    router('/resultados', {
      state: {
        comuna: comuna,
      },
    });
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

      {comunasState.length <= 1 && (
        <List
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
          {comunasState.map((comuna) => (
            <ListItem
              value={comuna}
              defaultValue={comuna}
              key={comuna}
              onClick={() => clickComunaHandler(comuna)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '0.5rem',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                maxWidth: 'fit-content',
              }}
            >
              {comuna}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default SearchBar;
