import { Prestador } from '@/types/Prestador';

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
  console.log(prestador);
  return <div>MobileProfile</div>;
};
