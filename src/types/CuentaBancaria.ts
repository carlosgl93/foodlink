export type CuentaBancaria = {
  id?: number;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titular: string;
  rut: string;
  prestadorId: number;
  createdAt?: string;
  updatedAt?: string;
};
