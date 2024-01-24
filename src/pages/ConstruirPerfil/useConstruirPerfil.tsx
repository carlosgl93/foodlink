import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { usePrestador } from '../PerfilPrestador/usePrestador';
import { useNavigate } from 'react-router-dom';

type Perfil = {
  prestadorId: number;
  disponibilidad: DisponibilidadFromFront[] | undefined | null;
  comunas: string[];
  // tarifas: any[];
  // experiencia: any[];
  // detallesAdicionales: any[];
  // cuentaBancaria: any[];
  // historialLaboral: any[];
  // educacionFormacion: any[];
  // registroSuperIntendenciaSalud: any[];
  // insignias: any[];
  // inmunizacion: any[];
  // idiomas: any[];
  // antecedentesCulturales: any[];
  // religion: any[];
  // interesesHobbies: any[];
  // sobreMi: any[];
  // misPreferencias: any[];
  [key: string]: string | number | DisponibilidadFromFront[] | undefined | null | string[];
};

export const useConstruirPerfil = () => {
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFromFront[]>([]);
  const [{ user }] = useAuth();
  const router = useNavigate();

  const { prestador } = usePrestador({ id: user?.id });
  const { id, comunas } = prestador;

  const handleGetDisponibilidad = async (id: number) => {
    const disponibilidad = await getDisponibilidadByPrestadorId(id);
    return disponibilidad;
  };

  const handleVerPerfil = () => router(`/preview-perfil-prestador/${id}`);

  useEffect(() => {
    const loadDisponibilidad = async () => {
      const disponibilidad = await handleGetDisponibilidad(user?.id ?? 0);
      setDisponibilidad(disponibilidad ?? []);
    };

    loadDisponibilidad();
  }, []);

  const perfil: Perfil = {
    prestadorId: id,
    disponibilidad: disponibilidad,
    comunas,
    // tarifas,
    // experiencia,
    // detallesAdicionales,
    // cuentaBancaria,
    // historialLaboral,
    // educacionFormacion,
    // registroSuperIntendenciaSalud,
    // insignias,
    // inmunizacion,
    // idiomas,
    // antecedentesCulturales,
    // religion,
    // interesesHobbies,
    // sobreMi,
    // misPreferencias,
  };

  return {
    perfil,
    disponibilidad,
    setDisponibilidad,
    handleGetDisponibilidad,
    handleVerPerfil,
  };
};
