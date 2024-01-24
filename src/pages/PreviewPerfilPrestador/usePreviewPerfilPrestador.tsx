import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrestador } from './usePrestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Servicio, Especialidad } from '@/types/Servicio';
import { useState, useEffect } from 'react';
import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';

export const usePreviewPerfilPrestador = () => {
  const { id } = useParams();
  const isTablet = useMediaQuery(tablet);

  const prestadorId = Number(id);

  const { prestador, loading, error } = usePrestador({ id: prestadorId });
  const [{ allServicios }] = useRecibeApoyo();
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFromFront[]>([]);

  const { service_id, speciality_id } = prestador;

  const router = useNavigate();

  const handleEditPerfil = () => {
    router('/construir-perfil');
  };

  useEffect(() => {
    const thisPrestadorServicio = allServicios?.find((s) => s.service_id === service_id);
    if (thisPrestadorServicio) {
      setPrestadorServicio(thisPrestadorServicio);
    }

    const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
      (e) => e.especialidad_id === speciality_id,
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
    prestador,
    loading,
    error,
    isTablet,
    prestadorServicio,
    prestadorEspecialidad,
    open,
    handleEditPerfil,
    disponibilidad,
  };
};
