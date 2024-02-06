import api from '../api';

export const getCustomer = async (id: number) => {
  try {
    const res = await api.get(`users/${id}`, {
      params: {
        id,
      },
    });
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
  }
};
