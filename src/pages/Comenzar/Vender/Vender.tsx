import { Suspense } from 'react';
import Loading from '@/components/Loading';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { LinearProgress, Box } from '@mui/material';
import { venderSteps as steps } from './venderSteps';
import { VenderController } from './VenderController';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export const Vender = () => {
  const { venderSteps } = VenderController();

  return (
    <>
      <Meta title="Encuentra la ayuda que necesitas en Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <LinearProgress variant="determinate" value={((venderSteps + 1) / steps.length) * 100} />
        </Box>
        <Suspense fallback={<Loading />}>
          {venderSteps === 0 && <Step1 />}
          {venderSteps === 1 && <Step2 />}
          {venderSteps === 2 && <Step3 />}
        </Suspense>
      </FullSizeCenteredFlexBox>
    </>
  );
};
