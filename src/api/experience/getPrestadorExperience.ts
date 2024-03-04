import api from '../api';

export const getPrestadorExperience = async (prestadorId: number) =>
  await api.get(`experience/${prestadorId}`).then((res) => res.data);
