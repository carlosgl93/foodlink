export type ComoFuncionaContent = {
  image: string;
  imgAlt: string;
  title: string;
  text: string;
};

export const comoFuncionaCardsContent: ComoFuncionaContent[] = [
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
