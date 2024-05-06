// import { HeaderIconImage } from '@/components/styled';
import { HeaderIconImage } from '@/components/styled';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const BrandHomeLinkMobile = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderIconImage src={`/android-chrome-192x192.png`} alt="Blui logo" />
      </Link>
    </Box>
  );
};
