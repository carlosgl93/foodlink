import { Suspense, lazy } from 'react';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/ImageContainer';
import { Box, LinearProgress } from '@mui/material';
import { entregaApoyoSteps } from './entregaApoyoSteps';
const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));
import useEntregaApoyo from '@/store/entregaApoyo';
import Loading from '@/components/Loading';

function Comienzo() {
  const [{ step }] = useEntregaApoyo();

  return (
    <>
      <Meta title="Comienza a usar Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
          pt: 4,
        }}
      >
        <Box>
          <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 200,
              height: 'auto',
            }}
          />
        </Box>
        <Box
          sx={{
            width: '500px',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={((step + 1) / entregaApoyoSteps.length) * 100}
          />
        </Box>
        <Suspense fallback={<Loading />}>
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}
        </Suspense>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Comienzo;
