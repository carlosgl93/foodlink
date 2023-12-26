import Meta from '@/components/Meta';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Box, useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import { useRecoilValueLoadable } from 'recoil';
import { getPrestadoresByComunaAndServicio } from '@/api/prestadores/getPrestadoresByComunaAndServicio';
import Loading from '@/components/Loading';
import { getAllComunas } from '@/api/comunas/getAllComunas';
import { useEffect } from 'react';
import { Text } from '@/components/StyledComponents';

function Resultados() {
  const [{ servicio, comuna }, { setComunas, setPrestadores }] = useRecibeApoyo();
  const isTablet = useMediaQuery(tablet);

  const comunasFetched = useRecoilValueLoadable(getAllComunas);

  useEffect(() => {
    if (comunasFetched.state === 'hasValue') {
      setComunas(comunasFetched.contents?.data);
    }
  }, [comunasFetched, setComunas]);

  const prestadoresByComunaAndServicio = useRecoilValueLoadable(
    getPrestadoresByComunaAndServicio({
      comuna: comuna?.id || null,
      servicio: servicio?.service_id,
    }),
  );

  useEffect(() => {
    if (prestadoresByComunaAndServicio.state === 'hasValue') {
      setPrestadores(prestadoresByComunaAndServicio.contents?.data);
    }
  }, [prestadoresByComunaAndServicio, setPrestadores]);

  const resultsLength = prestadoresByComunaAndServicio.contents?.length;

  switch (prestadoresByComunaAndServicio.state) {
    case 'hasValue':
      return (
        <>
          <Meta title="Resultados" />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: '2rem',
              px: '1rem',
              height: '2.5vh',
              width: '100%',
            }}
          >
            <Text>
              {resultsLength > 0
                ? `${resultsLength} ${
                    resultsLength === 1 ? 'prestador encontrado' : 'prestadores encontrados'
                  }`
                : 'Ningun prestador encontrado para esta combinación de filtros.'}
            </Text>
          </Box>

          {isTablet ? (
            <MobileResults filteredPrestadores={prestadoresByComunaAndServicio.contents} />
          ) : (
            <DesktopResults filteredPrestadores={prestadoresByComunaAndServicio.contents} />
          )}
        </>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <>There was an error</>;
  }
}

export default Resultados;
