import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/ImageContainer';
import { Box, LinearProgress } from '@mui/material';
import { entregaApoyoSteps } from './entregaApoyoSteps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import useEntregaApoyo from '@/store/entregaApoyo';

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
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Comienzo;
