import useEntregaApoyo from '@/store/entregaApoyo';
import { notificationState } from '@/store/snackbar';
import { ChangeEvent, useReducer } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CreateProveedorParams, useAuthNew } from '@/hooks/useAuthNew';
import { offeredProductsState, offererDispatchState } from '@/store/comienzo/vender';

type FormState = {
  error: string;
  representativeName: string;
  companyName: string;
  companyRut: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormActions =
  | {
      type: 'CHANGE';
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'ERROR';
      payload: {
        error: string;
      };
    };

const reducer = (state: FormState, action: FormActions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const RegistrarProveedorController = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const { createProveedor } = useAuthNew();
  const productType = useRecoilValue(offeredProductsState);
  const despacho = useRecoilValue(offererDispatchState);

  const [{ selectedComunas }] = useEntregaApoyo();

  const initialState = {
    error: '',
    representativeName: '',
    companyName: '',
    companyRut: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    comunas: selectedComunas,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rutRegex = /^[0-9]+-[0-9kK]{1}$/;

  const handleSubmit = async () => {
    const { email, companyName, companyRut, password, confirmPassword, representativeName } = state;

    if (!emailRegex.test(email)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Email inválido',
        },
      });
      setNotification({
        ...notification,
        open: true,
        message: 'Email inválido',
        severity: 'error',
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (!rutRegex.test(companyRut)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'RUT inválido',
        },
      });
      setNotification({
        ...notification,
        open: true,
        message: 'RUT inválido',
        severity: 'error',
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (confirmPassword !== password) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Las contraseñas no coinciden',
        },
      });
      setNotification({
        ...notification,
        open: true,
        message: 'Las contraseñas no coinciden',
        severity: 'error',
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else {
      const proveedor: CreateProveedorParams = {
        representativeName,
        companyName,
        companyRut,
        email,
        password,
        productType,
        despacho,
        comunas: selectedComunas,
      };

      createProveedor(proveedor);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  return {
    state,
    handleChange,
    handleSubmit,
    handleSelect,
  };
};

export default RegistrarProveedorController;
