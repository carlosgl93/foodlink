import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ImageSliderProps {
  interval?: number;
}

const ImageSliderImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.5s ease-in-out',
});

const ImageSliderOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

const ImageSliderText = styled(Typography)({
  color: 'white',
  zIndex: 1,
});

const images = ['/images/slide-1.jpg', '/images/slide-2.jpg', '/images/slide-3.jpg'];

function ImageSlider({ interval = 5000 }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, interval]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: {
          xs: '100vh',
          sm: '95vh',
          md: '85vh',
          lg: '80vh',
        },
        overflow: 'hidden',
      }}
    >
      {images.map((image, index) => (
        <ImageSliderImage
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 0.8 : 0,
          }}
        >
          {index === currentImageIndex && <ImageSliderOverlay />}
        </ImageSliderImage>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
          p: {
            xs: '1rem',
          },
        }}
      >
        <ImageSliderText
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            mb: '1rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Encuentra proveedores o retailers de alimentos.
        </ImageSliderText>
        {/* <ImageSliderText
          variant="subtitle1"
          sx={{
            color: 'white',
          }}
        >
          Blui conecta a personas para construir una red de apoyo segura y comunitaria
        </ImageSliderText> */}
        {/* <SearchBar /> */}
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            mt: '1rem',
          }}
        >
          <Button
            sx={{
              color: 'primary.light',
            }}
            onClick={() => navigate('/comenzar/comprar')}
            variant="contained"
          >
            Comprar
          </Button>
          <Button
            sx={{
              color: 'primary.light',
            }}
            onClick={() => navigate('/comenzar/vender')}
            variant="contained"
          >
            Vender
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ImageSlider;
