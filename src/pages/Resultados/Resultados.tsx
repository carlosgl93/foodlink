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

  useEffect(() => {
    if (servicio && comunas && especialidad.length === 0) {
      dummyPrestadores.forEach((p) => {
        if (p.service === servicio) {
          p.comunas.forEach((c) => {
            if (comunas.includes(c)) {
              setFilteredPrestadores((prev) => [...prev, p]);
            }
          });
        } else return;
      });
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

      {isTablet ? (
        <MobileResults filteredPrestadores={filteredPrestadores} />
      ) : (
        <DesktopResults filteredPrestadores={filteredPrestadores} />
      )}
    </>
  );
}

export default Resultados;
