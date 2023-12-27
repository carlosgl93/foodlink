import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Ingresar() {
  return (
    <>
      <Meta title="Inicia Sesion" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Ingresar</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Ingresar;
