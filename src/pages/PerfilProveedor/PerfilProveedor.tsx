import { useParams } from 'react-router-dom';
import { MobileProfile } from './MobileProfile';
import Loading from '@/components/Loading';
import { usePrestador } from '@/hooks';
import Meta from '@/components/Meta';
import { Suspense } from 'react';

export function PerfilProveedor() {
  const { id } = useParams();
  const { prestador, isLoading } = usePrestador(id ?? '');

  if (isLoading) {
    return <Loading />;
  }

  if (!prestador) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Meta title="Perfil Proveedor" />
      <MobileProfile proveedor={prestador} />
    </Suspense>
  );
}

export default PerfilProveedor;
