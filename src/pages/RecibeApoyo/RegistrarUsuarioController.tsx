import { ChangeEvent, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
type FormState = {
  error: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  comoEnteraste: string;
  nombrePaciente: string;
  direccionCliente: string;
  telefonoCliente: string;
  correoCliente: string;
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
  const router = useNavigate();
  const initialState = {
    error: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    comoEnteraste: '',
    nombrePaciente: '',
    direccionCliente: '',
    telefonoCliente: '',
    correoCliente: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(state.correo)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Email inválido',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (state.confirmarContrasena !== state.contrasena) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Las contraseñas no coinciden',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else {
      //   TODO: IMPLEMENT CREATE PRESTADOR
      router('/perfil-prestador');
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
