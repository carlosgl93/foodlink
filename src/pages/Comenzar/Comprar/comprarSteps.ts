// type comprarSteps = {
//   title: string;
//   text?: string;
//   options?:
//     | InterestedProduct[]
//     | Quantity[]
//     | {
//         id: string;
//         value: string;
//         name: string;
//       }[];
// }[];

export const comprarSteps = [
  {
    title: 'Productos de interés',
    text: '¿Qué tipo de productos estás buscando comprar al por mayor?',
    options: [
      {
        id: '0',
        value: 'mar-congelados',
        name: 'Congelados del mar',
      },
      {
        id: '1',
        value: 'mar-frescos',
        name: 'Frescos del mar',
      },
      {
        id: '2',
        value: 'no-perecibles',
        name: 'No perecibles',
      },
      {
        id: '3',
        value: 'lacteos',
        name: 'Lacteos',
      },
      //   {
      //     value: 'empaque',
      //     name: 'Empaque',
      //   },
      //   {
      //     value: 'limpieza',
      //     name: 'Limpieza',
      //   },
      {
        id: '4',
        value: 'bebestibles',
        name: 'Bebestibles',
      },
      {
        id: '5',
        value: 'congelados',
        name: 'Congelados',
      },
    ],
  },
  {
    title: 'Certificaciones',
    text: '¿Buscas alguna certificación en especial?',
    options: [
      {
        id: '10',
        value: 'libre-sellos',
        name: 'Libre de sellos',
      },
      {
        id: '11',
        value: 'ISO-22000',
        name: 'ISO 22000 - Inoculidad',
      },
      {
        id: '0',
        value: 'orgánico',
        name: 'Orgánico',
      },
      {
        id: '1',
        value: 'vegano',
        name: 'Vegano',
      },
      {
        id: '3',
        value: 'kosher',
        name: 'Kosher',
      },
      {
        id: '4',
        value: 'sin-gluten',
        name: 'Sin gluten',
      },
      {
        id: '5',
        value: 'sin-lactosa',
        name: 'Sin lactosa',
      },
      {
        id: '6',
        value: 'fair-trade',
        name: 'Fair Trade',
      },
    ],
  },
  // {
  //   title: 'Cantidad',
  //   text: '¿Cuál es la cantidad estimada que estás interesado en comprar?',
  //   options: [
  //     {
  //       id: '0',
  //       value: 'kilogramos',
  //       name: 'Kilogramos',
  //     },
  //     {
  //       id: '4',
  //       value: 'docenas',
  //       name: 'Docenas',
  //     },
  //     {
  //       id: '1',
  //       value: 'cajas',
  //       name: 'Cajas',
  //     },
  //     {
  //       id: '2',
  //       value: 'pallets',
  //       name: 'Pallets',
  //     },
  //     {
  //       id: '3',
  //       value: 'toneladas',
  //       name: 'Toneladas',
  //     },
  //   ],
  // },
  {
    title: 'Comuna de entrega',
    text: '¿En qué comuna deseas recibir tu pedido?',
  },
];
