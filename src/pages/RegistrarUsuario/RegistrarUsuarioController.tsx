import { useAuthNew } from '@/hooks';
import { ChangeEvent, useReducer } from 'react';

type FormState = {
  representativeName: string;
  confirmPassword: string;
  companyName: string;
  companyRut: string;
  password: string;
  phone: string;
  email: string;
  error: string;
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

const RegistrarUsuarioController = () => {
  const { createUser } = useAuthNew();

  const initialState = {
    error: '',
    companyName: '',
    representativeName: '',
    companyRut: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { companyName, representativeName, companyRut, phone, email, password, confirmPassword } =
    state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(email)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Email inválido',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (confirmPassword !== password) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Las contraseñas no coinciden',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else {
      const newUser = {
        companyName,
        representativeName,
        companyRut,
        phone,
        email,
        password,
        confirmPassword,
      };

      try {
        createUser(newUser);
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: {
            error: 'Error al crear usuario',
          },
        });
      }
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

export default RegistrarUsuarioController;
