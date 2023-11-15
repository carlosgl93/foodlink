import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const comoFuncionaCardsContent = [
  {
    image: `/images/blui-icon-1.png`,
    imgAlt: 'Blui busca una persona de apoyo',
    title: 'Busca una persona de apoyo',
    text: 'Busca libremente los distintos perfiles de personas de apoyo que se encuentran en Blui. Utiliza nuestros filtros para que puedas encontrar a aquellas personas que respondan a tus necesidades, intereses y disponibilidad.',
  },
  {
    image: `/images/blui-icon-2.png`,
    imgAlt: 'Imagen de un saludo con un apreton de manos',
    title: 'Agenda una sesión de apoyo',
    text: 'Selecciona los perfiles que más te gusten y contáctalos directamente a través de Blui acordando libremente todas las condiciones del servicio tales como día, lugar y precio.',
  },
  {
    image: `/images/blui-icon-3.png`,
    imgAlt: 'Imagen de una casa en nuestras manos',
    title: 'Confía en nosotros ¡estás protegido!',
    text: 'En Blui estamos constantemente preocupados por tu seguridad. Al formar parte de nuestra comunidad tanto tú como las personas de apoyo podrán acceder a coberturas de seguro. Además, ten la tranquilidad de estar en manos de personas que se encuentran debidamente certificadas y validadas por Blui.',
  },
];

const ComoFunciona = () => {
  return (
    <Box
      component="section"
      sx={{
        py: '2rem',
        px: {
          xs: '1rem',
          sm: '2rem',
          md: '3rem',
        },
        textAlign: 'center',
        backgroundColor: '#f9f7f6',
      }}
    >
      <Box sx={{}}>
        <Typography
          variant="h1"
          color="primary.dark"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
          }}
        >
          Cómo funciona
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '1.5rem',
          }}
        >
          Únete a Blui de forma gratuita y comienza a vivir esta nueva experiencia en la búsqueda de
          personas para ayudarte. Disfruta la posibilidad de poder formar tu propio equipo de apoyo
          de acuerdo a tus propias necesidades, intereses y presupuesto.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: {
            xs: '2rem',
            md: '4rem',
          },

          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mt: '2rem',
        }}
      >
        {comoFuncionaCardsContent.map((card, index) => (
          <Box
            key={index}
            sx={{
              minHeight: {
                md: '500px',
              },
              width: {
                xs: '100%',
                sm: '30%',
              },
              backgroundColor: 'white',
              borderRadius: '1rem',
              p: '1rem',
              mb: {
                xs: '2rem',
                sm: 0,
              },
              position: 'relative', // Add position relative to the parent Box
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: '1rem',
              }}
            >
              <img
                src={card.image}
                alt={card.imgAlt}
                style={{
                  maxWidth: '10rem',
                  maxHeight: '10rem',
                }}
              />
            </Box>
            <Typography
              variant="h2"
              color="primary.dark"
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                mb: '1rem',
              }}
            >
              {card.title}
            </Typography>
            <Typography variant="body1" sx={{}} color="primary.dark">
              {card.text}
            </Typography>
            <Box
              sx={{
                position: 'absolute', // Add position absolute to the child Box
                top: '-1rem', // Position the Box at the top of the parent Box
                left: '50%', // Position the Box in the center of the parent Box
                transform: 'translateX(-50%)', // Center the Box horizontally
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: '#2eba6d',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              {index + 1}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: '2rem',
        }}
      >
        <Link to={'/comenzar'}>
          <Button
            variant="contained"
            sx={{
              p: '1rem',
              borderRadius: '1000em',
              width: '10rem',
            }}
          >
            Comenzar
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ComoFunciona;
