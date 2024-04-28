const title = 'Foodlink';
// TODO change this email
const email = 'soporte@foodlink.com';
// TODO change the repository
const repository = 'https://github.com/TODO';

const messages = {
  app: {
    crash: {
      title: 'Oops... Algo salio mal, puedes:',
      options: {
        email: `contactar a soporte al mail: ${email}`,
        reset: 'Presionar aqui para recargar la aplicacion',
      },
    },
  },
  loader: {
    fail: 'Hmm, Algo anda mal, intentalo nuevamente',
  },
  images: {
    failed: 'No se pudo cargar la imagen',
  },
  404: 'Esta pagina no existe.',
};

const dateFormat = 'DD MMMM, YYYY';

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 500, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Foodlink: Alimentando negocios.',
};
const giphy404 = 'https://giphy.com/embed/2asOjumchIeb5gZO9m';

export { loader, dateFormat, messages, repository, email, title, defaultMetaTags, giphy404 };
