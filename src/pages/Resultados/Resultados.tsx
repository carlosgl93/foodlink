import { useEffect, useState } from 'react';
import Meta from '@/components/Meta';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import { dummyPrestadores, Prestador } from '@/utils/constants';

function Resultados() {
  const [{ servicio, especialidad, comunas }] = useRecibeApoyo();
  const isTablet = useMediaQuery(tablet);
  const [filteredPrestadores, setFilteredPrestadores] = useState<[] | Prestador[]>([]);

  // let filteredPrestadores: Prestador[] = [];
  useEffect(() => {
    if (servicio && comunas && especialidad.length === 0) {
      // por cada prestador,
      dummyPrestadores.forEach((p) => {
        // debo iterar por sus comunas y ver si las comunas seleccionadas matchean
        if (p.service === servicio) {
          p.comunas.forEach((c) => {
            if (comunas.includes(c)) {
              setFilteredPrestadores((prev) => [...prev, p]);
            }
          });
        } else return;
      });

      // console.log(matchesComuna);
    } else if (servicio && comunas && especialidad) {
      dummyPrestadores.forEach((p) => {
        if (p.service === servicio) {
          p.comunas.forEach((c) => {
            if (comunas.includes(c)) {
              if (p.speciality === especialidad) {
                setFilteredPrestadores((prev) => [...prev, p]);
              }
            }
          });
        } else return;
      });
    }
  }, [comunas, servicio, especialidad]);

  return (
    <>
      <Meta title="Resultados" />

      {isTablet ? <MobileResults /> : <DesktopResults filteredPrestadores={filteredPrestadores} />}
    </>
  );
}

export default Resultados;
