import useAuth from '@/store/auth';
import useEntregaApoyo from '@/store/entregaApoyo';
import { notificationState } from '@/store/snackbar';
import { ChangeEvent, useReducer } from 'react';
import { useRecoilState } from 'recoil';

type FormState = {
  error: string;
  nombre: string;
  apellidos: string;
  rut: string;
  telefono: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  comoEnteraste: string;
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

const RegistrarPrestadorController = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const [, { createPrestador }] = useAuth();

  const [{ selectedComunas, selectedServicio, selectedEspecialidad }] = useEntregaApoyo();

  const initialState = {
    error: '',
    nombre: '',
    apellidos: '',
    rut: '',
    telefono: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    comoEnteraste: '',
    comunas: selectedComunas,
    servicio: selectedServicio,
    especialidad: selectedEspecialidad,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rutRegex = /^[0-9]+-[0-9kK]{1}$/;

  const handleSubmit = async () => {
    console.log(state);
    const { nombre, apellidos, correo, rut, telefono, contrasena, confirmarContrasena } = state;

    if (!emailRegex.test(state.correo)) {
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
    } else if (!rutRegex.test(rut)) {
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
    } else if (confirmarContrasena !== contrasena) {
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
      //   TODO: IMPLEMENT CREATE PRESTADOR
      console.log(state);
      const prestador = {
        firstname: nombre,
        lastname: apellidos,
        rut: rut,
        phone: telefono,
        email: correo,
        password: contrasena,
        comunas: selectedComunas,
        service_id: selectedServicio?.service_id,
        speciality_id: selectedEspecialidad?.especialidad_id,
      };
      console.log('prestador before submitting', prestador);

      createPrestador(prestador);
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

export default RegistrarPrestadorController;
