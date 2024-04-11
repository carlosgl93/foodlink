import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Servicio, Especialidad } from '@/types/Servicio';
import { useState, useEffect } from 'react';
import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import useAuth from '@/store/auth';
import { Prestador } from '@/types';

export const usePreviewPerfilPrestador = () => {
  const isTablet = useMediaQuery(tablet);
  const [{ user }] = useAuth();

  const prestadorId = user?.id ?? '' ?? '';

  const [{ allServicios }] = useRecibeApoyo();
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFromFront[]>([]);

  const { service_id, speciality_id } = user as Prestador;

  const router = useNavigate();

  const handleEditPerfil = () => {
    router('/construir-perfil');
  };

  useEffect(() => {
    const thisPrestadorServicio = allServicios?.find((s) => s.id === service_id);
    if (thisPrestadorServicio) {
      setPrestadorServicio(thisPrestadorServicio);
    }

    const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
      (e) => e.id === speciality_id,
    ) as Especialidad;

    if (thisPrestadorEspecialidad) {
      setPrestadorEspecialidad(thisPrestadorEspecialidad);
    }
  }, [allServicios, service_id, speciality_id]);

  useEffect(() => {
    getDisponibilidadByPrestadorId(prestadorId).then((res) => {
      setDisponibilidad(res as DisponibilidadFromFront[]);
    });
  }, [prestadorId]);

  return {
    prestador: user,
    isTablet,
    prestadorServicio,
    prestadorEspecialidad,
    open,
    handleEditPerfil,
    disponibilidad,
  };
};
