import { DisponibilidadFromFront } from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { useCallback, useState } from 'react';
import { useConstruirPerfil } from '../useConstruirPerfil';
import { postDisponibilidad } from '@/api/disponibilidad/postDisponibilidad';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';

export const useEditAvailableDays = () => {
  const [error, setError] = useState<string>('');
  const [notification, setNotification] = useRecoilState(notificationState);

  const { perfil, setDisponibilidad } = useConstruirPerfil();
  const { id, disponibilidad } = perfil;

  const times = Array.from({ length: 24 }, (_, hour) => [
    `${hour.toString().padStart(2, '0')}:00`,
    `${hour.toString().padStart(2, '0')}:30`,
  ]).flat();

  const handleToggleDay = useCallback(
    (dayName: string) => {
      setDisponibilidad((prevDisponibilidad: DisponibilidadFromFront[]) => {
        return prevDisponibilidad.map((day) => {
          if (day.dayName === dayName) {
            return {
              ...day,
              prestadorId: day.prestadorId,

              isAvailable: !day.isAvailable,
            };
          }
          return day;
        });
      });
    },
    [id, setDisponibilidad],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, startOrEnd: 'startTime' | 'endTime') => {
      console.log(e.target.value);
      console.log(startOrEnd);
      setDisponibilidad((prevDisponibilidad: DisponibilidadFromFront[]) => {
        setError('');
        return prevDisponibilidad.map((day) => {
          if (`${startOrEnd}${day.dayName}` === e.target.name) {
            // add validation to check if startTime is less than endTime
            if (startOrEnd === 'startTime') {
              const startTime = e.target.value;
              const endTime = day.endTime;
              if (startTime > endTime) {
                setError('La hora de inicio no puede ser mayor a la hora de término');
                setNotification({
                  ...notification,
                  open: true,
                  message: 'La hora de inicio no puede ser mayor a la hora de término',
                  severity: 'error',
                });
                console.log('startTime is greater than endTime');
                return day;
              }
            } else if (startOrEnd === 'endTime') {
              const startTime = day.startTime;
              const endTime = e.target.value;
              if (startTime > endTime) {
                setError('La hora de inicio no puede ser mayor a la hora de término');
                setNotification({
                  ...notification,
                  open: true,
                  message: 'La hora de término no puede ser menor a la hora de inicio',
                  severity: 'error',
                });
                console.log('startTime is greater than endTime');
                return day;
              }
            }

            return {
              ...day,
              prestadorId: day.prestadorId,
              [startOrEnd]: e.target.value,
            };
          }
          return day;
        });
      });
    },
    [],
  );

  const handleSave = useCallback(async (_disponibilidad: DisponibilidadFromFront[]) => {
    console.log('newDisponibilidad', disponibilidad);
    if (_disponibilidad === disponibilidad) return;
    try {
      await postDisponibilidad(_disponibilidad);
      setNotification({
        ...notification,
        open: true,
        message: 'Disponibilidad guardada exitosamente',
        severity: 'success',
      });
    } catch (error) {
      console.log({ error });
      setNotification({
        ...notification,
        open: true,
        message: 'Error al guardar la disponibilidad',
        severity: 'error',
      });
    }
  }, []);

  return {
    disponibilidad,
    handleToggleDay,
    handleSave,
    handleTimeChange,
    times,
    error,
  };
};
