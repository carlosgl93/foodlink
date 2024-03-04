import { ExperienceState } from '@/store/construirPerfil/experiencia';
import api from '../api';

export const saveExperiences = async (
  prestadorId: number,
  aggregatedExperience: ExperienceState,
) => {
  const res = await api.post(`experience`, {
    prestadorId,
    experiences: aggregatedExperience,
  });
  return res.data;
};
