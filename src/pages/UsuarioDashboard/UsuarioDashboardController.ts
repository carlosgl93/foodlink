import { useNavigate } from 'react-router-dom';

export const UsuarioDashboardController = () => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate(`/perfil-usuario`);
  };

  const handleBuscarPrestadores = () => {
    navigate('/resultados');
  };

  const usuarioDashboardOptions = [
    {
      title: 'Actualizar perfil',
      subTitle: 'Agrega más información sobre tu empresa.',
      text: 'Productos, promociones, servicios, y más.',
      ctaText: 'Ir al perfil',
      onButtonClick: handleGoToProfile,
    },
    {
      title: 'Buscar proveedores',
      subTitle: 'Explora los perfiles de los proveedors.',
      text: 'Usa filtros tales como  el tipo de producto y/o despacho, luego contactalos!',
      ctaText: 'Buscar proveedores',
      onButtonClick: handleBuscarPrestadores,
    },
  ];

  return {
    usuarioDashboardOptions,
  };
};
