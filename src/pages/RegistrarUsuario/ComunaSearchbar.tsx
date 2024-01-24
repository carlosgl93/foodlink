import React, { useState } from 'react';
import { InputAdornment, IconButton, Box, TextField } from '@mui/material';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Comuna } from '@/types/Comuna';
import { Search } from '@mui/icons-material';
import { SearchBarIcon, StyledComunaSearchBar, StyledResults } from './StyledRegistrarUsuario';

type ComunaSearchbarProps = {
  isTablet: boolean;
};

export const ComunaSearchbar = ({ isTablet }: ComunaSearchbarProps) => {
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
    const match = allComunas?.filter((comuna: Comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    setComunasState(match);
  };

  if (comuna === null) {
    return (
      <>
        <StyledComunaSearchBar
          sx={{
            width: isTablet ? '225px' : '465px',
          }}
          id="searchByComuna"
          type={'text'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="buscar por comuna" edge="end">
                <SearchBarIcon>
                  <Search
                    sx={{
                      color: 'white',
                    }}
                  />
                </SearchBarIcon>
              </IconButton>
            </InputAdornment>
          }
          placeholder="Indicanos la comuna donde necesitas apoyo"
          onChange={onChangeHandler}
        />
        <StyledResults>
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
        </StyledResults>
      </>
    );
  } else {
    return (
      <TextField
        label={'Comuna seleccionada'}
        name={'comuna'}
        variant="outlined"
        type={'text'}
        onClick={() => removeComuna(comuna)}
        value={comuna.name}
        sx={{
          m: {
            xs: 1,
            sm: 2,
            md: 3,
          },
        }}
      />
    );
  }
};
