export type Servicio = {
  especialidades: Especialidad[];
  service_id: number;
  service_name: string;
  servicio_description: string | null;
};

export type Especialidad = {
  especialidad_id: number;
  especialidad_name: string;
  especialidad_description: string | null;
};
