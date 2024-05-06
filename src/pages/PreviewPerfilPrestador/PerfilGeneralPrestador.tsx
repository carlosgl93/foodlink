import { Proveedor } from '@/types';

type PerfilGeneralPrestadorProps = {
  proveedor: Proveedor;
};

export const PerfilGeneralPrestador = ({ proveedor }: PerfilGeneralPrestadorProps) => {
  console.log('This prestador', proveedor);
  return (
    <>
      <h1>Perfil General Prestador</h1>
    </>
  );
};
