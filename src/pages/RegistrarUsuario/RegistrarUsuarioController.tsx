import useAuth from '@/store/auth';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Comuna } from '@/types/Comuna';
import { ChangeEvent, useReducer } from 'react';

type FormState = {
  error: string;
  nombre: string;
  apellido: string;
  paraQuien: string;
  nombrePaciente: string;
  rut: string;
  comuna: Comuna | null;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
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
  const [_, { createUser }] = useAuth();

  console.log(_);

  const [{ forWhom, comuna }] = useRecibeApoyo();

  const initialState = {
    error: '',
    nombre: '',
    apellido: '',
    paraQuien: forWhom,
    nombrePaciente: '',
    rut: '',
    comuna: comuna || null,
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    error,
    nombre,
    apellido,
    paraQuien,
    nombrePaciente,
    rut,
    correo,
    contrasena,
    confirmarContrasena,
  } = state;

  console.log(error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    console.log(state);

    if (!emailRegex.test(correo)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Email inválido',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (confirmarContrasena !== contrasena) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Las contraseñas no coinciden',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else {
      const newUser = {
        firstname: nombre,
        lastname: apellido,
        forWhom: paraQuien,
        nombrePaciente: nombrePaciente,
        rut: rut,
        comuna_id: comuna!.id,
        email: correo,
        password: contrasena,
      };

      try {
        createUser(newUser);
      } catch (error) {
        console.log(error);
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
