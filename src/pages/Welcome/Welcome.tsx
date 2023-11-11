import CommunityAdvantages from '@/components/CommunityAdvantages';
import ComoFunciona from '@/components/ComoFunciona';
import ImageSlider from '@/components/ImageSlider';
import Meta from '@/components/Meta';
import Servicios from '@/components/Servicios';
import CommunitySupport from '@/components/CommunitySupport';

function Welcome() {
  return (
    <>
      <Meta title="Blui: Inicio" />
      <ImageSlider />
      <ComoFunciona />
      <Servicios />
      <CommunityAdvantages />
      <CommunitySupport />
    </>
  );
}

export default Welcome;
