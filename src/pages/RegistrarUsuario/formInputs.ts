export const formInputs = [
  {
    inputName: 'companyName',
    placeholder: 'Nombre de la empresa',
    label: 'Nombre de la empresa (*)',
    type: 'text',
  },
  {
    inputName: 'representativeName',
    placeholder: 'Nombre del representante',
    label: 'Nombre del representante(*)',
    type: 'text',
  },
  {
    inputName: 'companyRut',
    placeholder: '76056132-0',
    label: 'RUT Empresa (*)',
    type: 'text',
    helperText: 'Ejemplo: 76056132-0. Sin puntos',
  },

  {
    inputName: 'phone',
    placeholder: 'Teléfono de contacto',
    label: 'Teléfono de contacto(*)',
    type: 'tel',
  },
  {
    inputName: 'email',
    placeholder: 'Email de contacto',
    label: 'Email de contacto (*)',
    type: 'email',
  },
  {
    inputName: 'password',
    placeholder: 'Ingrese una contraseña',
    label: 'Crea una contraseña',
    type: 'password',
    helperText: 'Mínimo 6 caracteres.',
  },
  {
    inputName: 'confirmPassword',
    placeholder: 'Confirme su contraseña',
    label: 'Confirma tu contraseña (*)',
    type: 'password',
  },
];
