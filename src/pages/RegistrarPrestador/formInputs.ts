export const formInputs = [
  {
    inputName: 'nombre',
    placeholder: 'Ingrese su nombre',
    label: 'Nombre (*)',
    type: 'text',
  },
  {
    inputName: 'apellidos',
    placeholder: 'Ingrese sus apellidos',
    label: 'Apellidos (*)',
    type: 'text',
  },
  {
    inputName: 'telefono',
    placeholder: 'Ingrese su teléfono móvil',
    label: 'Teléfono móvil (*)',
    type: 'tel',
  },
  {
    inputName: 'correo',
    placeholder: 'Ingrese su correo electrónico',
    label: 'Correo electrónico (*)',
    type: 'email',
  },
  {
    inputName: 'contrasena',
    placeholder: 'Ingrese una contraseña',
    label: 'Crea una contraseña',
    type: 'password',
  },
  {
    inputName: 'confirmarContrasena',
    placeholder: 'Confirme su contraseña',
    label: 'Confirma tu contraseña (*)',
    type: 'password',
  },
  {
    inputName: 'comoEnteraste',
    placeholder: 'Selecciona cómo te enteraste de Blui',
    label: 'Cómo te enteraste de Blui (*)',
    type: 'text',
    options: [
      'Google',
      'Redes sociales',
      'Radio/TV',
      'Noticias',
      'Personal del centro de salud',
      'Me contó alguien cercano',
      'Otra',
    ],
  },
];
