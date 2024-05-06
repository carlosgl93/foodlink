type SettingsKey =
  | 'products'
  | 'detallesBasicos'
  | 'comunas'
  | 'insignias'
  | 'inmunizacion'
  | 'misPreferencias';

export const construirPerfilOpciones: { key: SettingsKey; value: string }[] = [
  { key: 'products', value: 'Tus productos' },
  { key: 'detallesBasicos', value: 'Detalles basicos' },
  { key: 'comunas', value: 'Despacho' },
  // { key: 'insignias', value: 'Insignias' },
  // { key: 'inmunizacion', value: 'Inmunización' },
  { key: 'misPreferencias', value: 'Mis preferencias' },
];
