import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import SearchBar from '@/components/SearchBar';
// import useRecibeApoyo from '@/store/recibeApoyo';

function Resultados() {
  // const [{ forWhom, servicio, especialidad, comunas }, {}] = useRecibeApoyo();
  // TODO: implement search results with filters

  return (
    <>
      <Meta title="Resultados" />
      <FullSizeCenteredFlexBox>
        <SearchBar />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Resultados;
