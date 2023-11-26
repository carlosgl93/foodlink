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
    title: 'Completa tu perfil',
    text: 'Crea un perfil que ayude a los clientes a conocerte mejor. Para ello, deberás incluir una breve reseña tuya indicando quién eres, tus habilidades, motivación, experiencia y el tipo de servicio que ofreces. Asimismo, deberás dar a conocer el valor de tus servicios, disponibilidad e intereses.',
  },
  {
    image: `/images/blui-icon-2.png`,
    imgAlt: 'Imagen de un saludo con un apreton de manos',
    title: 'Obten la aprobación',
    text: 'Una vez que nuestro equipo Blui apruebe tu postulación, serás parte de nuestra comunidad. A partir de ese momento, las personas que busquen apoyo se pondrán en contacto contigo directamente, o bien, podrás tú mismo buscar ofertas de trabajo que se hayan publicado en la plataforma.',
  },
  {
    image: `/images/blui-icon-3.png`,
    imgAlt: 'Imagen de una casa en nuestras manos',
    title: 'Construye tu negocio en línea',
    text: 'A través de Blui podrás llevar tu negocio íntegramente en línea y de forma muy fácil. Podrás agendar y coordinar los servicios que prestes, hacer seguimiento a tus clientes y llevar tu historial y estadística de servicios prestados. El pago de cada servicio que prestes lo gestionaremos nosotros, por lo que podrás enfocarte tranquilamente en brindar apoyo de excelencia a quienes lo necesitan.',
  },
];
