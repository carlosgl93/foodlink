import { getPrestadorById } from '@/api/prestadores/getPrestadorById';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

type usePrestadorProps = {
  id?: number;
};

export const usePrestador = ({ id }: usePrestadorProps) => {
  const [params] = useSearchParams();

  const prestadorId = id ? id : params.get('prestadorId');

  const prestadorRecoil = useRecoilValueLoadable(getPrestadorById(prestadorId as number));
  const prestador = prestadorRecoil.state === 'hasValue' && prestadorRecoil.contents;
  const loading = prestadorRecoil.state === 'loading';
  const error = prestadorRecoil.state === 'hasError';

  return { prestador, loading, error };
};
