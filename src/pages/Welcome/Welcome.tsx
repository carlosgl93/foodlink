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
      <ImageSlider
        images={[
          'https://blui.populus.dev/blui/img/slide-1.jpg',
          'https://blui.populus.dev/blui/img/slide-2.jpg',
          'https://blui.populus.dev/blui/img/slide-3.jpg',
        ]}
      />
      <ComoFunciona />
      <Servicios />
      <CommunityAdvantages />
      <CommunitySupport />
    </>
  );
}

export default Welcome;
