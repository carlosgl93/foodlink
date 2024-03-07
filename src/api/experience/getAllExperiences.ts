import api from '../api';

export const getAllExperiences = async () => {
  try {
    const res = await api.get(`experience`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
  }
};
