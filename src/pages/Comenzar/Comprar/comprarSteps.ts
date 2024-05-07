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
        name: 'Frutas y Verduras Frescas',
        value: 'fruits-and-vegetables',
      },
      {
        id: '1',
        name: 'Carnes y Aves',
        value: 'meat-and-poultry',
      },
      {
        id: '2',
        name: 'Pescados y Mariscos',
        value: 'fish-and-seafood',
      },
      {
        id: '3',
        name: 'Lácteos',
        value: 'diary',
      },
      {
        id: '4',
        name: 'Panadería y Pastelería',
        value: 'bakery-and-pastry',
      },
      {
        id: '5',
        name: 'Bebestibles',
        value: 'beverages',
      },
      {
        id: '6',
        name: 'Secos y Enlatados',
        value: 'beverages',
      },
      {
        id: '7',
        name: 'Ingredientes y Condimentos',
        value: 'ingredients-and-condiments',
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
