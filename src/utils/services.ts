import { Servicio } from '@/types/Servicio';

export const services: Servicio[] = [
  {
    serviceName: 'Soporte Terapéutico',
    especialidades: [
      {
        especialidadName: 'Ansiedad',
      },
      {
        especialidadName: 'Trastorno Bipolar',
      },
      {
        especialidadName: 'Depresión',
      },
      {
        especialidadName: 'Trastornos Alimentarios',
      },
      {
        especialidadName: 'Acumulación Compulsiva',
      },
      {
        especialidadName: 'Trastorno Obsesivo-Compulsivo (TOC)',
      },
      {
        especialidadName: 'Trastorno de Estrés Postraumático (TEPT)',
      },
      {
        especialidadName: 'Esquizofrenia',
      },
      {
        especialidadName: 'Abuso de Sustancias y Adicción',
      },
    ],
  },
  {
    serviceName: 'Servicios de enfermería',
    especialidades: [
      {
        especialidadName: 'Lesión Cerebral Adquirida',
      },
      {
        especialidadName: 'Autismo',
      },
      {
        especialidadName: 'Parálisis Cerebral',
      },
      {
        especialidadName: 'Fibrosis Quística',
      },
      {
        especialidadName: 'Síndrome de Down',
      },
      {
        especialidadName: 'Epilepsia',
      },
      {
        especialidadName: 'Discapacidad Auditiva',
      },
      {
        especialidadName: 'Discapacidades Intelectuales',
      },
      {
        especialidadName: 'Enfermedad del Neurona Motor',
      },
      {
        especialidadName: 'Distrofia Muscular',
      },
      {
        especialidadName: 'Discapacidades Físicas',
      },
      {
        especialidadName: 'Espina Bífida',
      },
      {
        especialidadName: 'Lesión de la Médula Espinal',
      },
      {
        especialidadName: 'Discapacidad Visual',
      },
    ],
  },
  {
    serviceName: 'Apoyo en el hogar',
    especialidades: [
      {
        especialidadName: 'Demencia senil',
      },
      {
        especialidadName: 'Alzheimer',
      },
      {
        especialidadName: 'Parkinson',
      },
    ],
  },
  {
    serviceName: 'Cuidadora',
    especialidades: [
      {
        especialidadName: 'Artritis',
      },
      {
        especialidadName: 'Asma',
      },
      {
        especialidadName: 'Enfermedad Cardiovascular',
      },
      {
        especialidadName: 'EPOC o Enfermedad Respiratoria',
      },
      {
        especialidadName: 'Diabetes',
      },
    ],
  },

  {
    serviceName: 'Sana compañía',
    especialidades: [],
  },
].map((service, serviceId) => ({
  ...service,
  id: serviceId,
  especialidades: service.especialidades.map((especialidad, especialidadId) => ({
    ...especialidad,
    id: especialidadId,
  })),
}));
