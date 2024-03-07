import { Comuna, TarifaFront } from '@/types';

type Actions = {
  getPrestador(id: number): Promise<void>;
  getDisponibilidad(id: number): Promise<void>;
  getComunas(id: number): Promise<void>;
  getTarifas(id: number): Promise<void>;
  handleEditDisponibilidad: () => void;
  handleToggleDisponibilidadDay: (id: number) => void;
  handleTimeChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    startOrEnd: 'startTime' | 'endTime',
  ) => void;
  handleChangeFreeMeetGreet: () => void;
  handleSaveDisponibilidad: () => Promise<void>;
  handleSelectComuna: (comuna: Comuna) => void;
  handleRemoveComuna: (comuna: Comuna) => void;
  handleUpdatePrestadorComunas: () => Promise<void>;
  handleSearchComunaOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleVerPerfil: () => void;
  handleChangeTarifa: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tarifa: TarifaFront,
  ) => void;
  handleSaveTarifas: () => Promise<void>;
};

export type { Actions };
