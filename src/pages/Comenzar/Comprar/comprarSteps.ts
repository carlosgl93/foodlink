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
    title: 'Productos de interes',
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
    title: 'Cantidad',
    text: '¿Cuál es la cantidad estimada que estás interesado en comprar?',
    options: [
      {
        id: '0',
        value: 'kilogramos',
        name: 'Kilogramos',
      },
      {
        id: '4',
        value: 'docenas',
        name: 'Docenas',
      },
      {
        id: '1',
        value: 'cajas',
        name: 'Cajas',
      },
      {
        id: '2',
        value: 'pallets',
        name: 'Pallets',
      },
      {
        id: '3',
        value: 'toneladas',
        name: 'Toneladas',
      },
    ],
  },
  {
    title: 'Comuna de entrega',
    text: '¿En qué comuna deseas recibir tu pedido?',
  },
];
