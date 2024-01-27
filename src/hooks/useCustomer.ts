import { getCustomer } from '@/api/users/getCustomer';
import { User } from '@/types';
import { useState, useEffect } from 'react';

export const useCustomer = (customerId: number) => {
  const [customer, setCustomer] = useState<User | null>(null);

  useEffect(() => {
    getCustomer(customerId)
      .then((res) => {
        setCustomer(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customerId]);

  return {
    customer,
  };
};
