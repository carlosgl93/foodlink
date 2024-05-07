import { Suspense, lazy } from 'react';
// import { Image } from '@/components/ImageContainer';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, LinearProgress } from '@mui/material';
import { ComprarController } from './ComprarController';
import Loading from '@/components/Loading';
const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));
import { comprarSteps } from './comprarSteps';

export const Comprar = () => {
  const { comprarStep } = ComprarController();
  return (
    <>
      <Meta title="Encuentra la ayuda que necesitas en Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
          pt: 4,
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
            },
          }}
        >
          <LinearProgress
            variant="determinate"
            value={((comprarStep + 1) / comprarSteps.length) * 100}
          />
        </Box>
        <Suspense fallback={<Loading />}>
          {comprarStep === 0 && <Step1 />}
          {comprarStep === 1 && <Step2 />}
          {comprarStep === 2 && <Step3 />}
        </Suspense>
      </FullSizeCenteredFlexBox>
    </>
  );
};
