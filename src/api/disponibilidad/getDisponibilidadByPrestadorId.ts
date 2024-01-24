import { days } from '@/pages/ConstruirPerfil/Disponibilidad/days';
import api from '../api';

type DisponibilidadFromBack = {
  id: number;
  prestador_id: number;
  day_name: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
};

export type DisponibilidadFromFront = {
  id: number;
  prestadorId: number | null;
  dayName: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

const disponibilidadFromBackToFront = (
  disponibilidadFromBack: DisponibilidadFromBack[],
): DisponibilidadFromFront[] => {
  return disponibilidadFromBack.map(
    ({ id, prestador_id, day_name, start_time, end_time, is_available }) => ({
      id,
      prestadorId: prestador_id,
      dayName: day_name,
      startTime: start_time,
      endTime: end_time,
      isAvailable: is_available,
    }),
  );
};

export const getDisponibilidadByPrestadorId = async (
  prestadorId: number,
): Promise<DisponibilidadFromFront[] | undefined> => {
  try {
    const response = await api.get(`/disponibilidad/${prestadorId}`, { params: { prestadorId } });
    if (response.data.length === 0) {
      const data = days.map((day, i) => ({
        id: i,
        prestadorId: prestadorId,
        dayName: day.dayName,
        startTime: '00:00',
        endTime: '00:00',
        isAvailable: false,
      }));

      return data;
    } else {
      return disponibilidadFromBackToFront(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};
