import type { CatalogCategory } from '../types';

export const PRODUCT_CATALOG: CatalogCategory[] = [
  {
    id: 'hortifruti',
    title: '1. Hortifrúti',
    subtitle: 'Frutas, Verduras e Legumes',
    groups: [
      {
        label: 'Frutas',
        items: [
          'Banana',
          'Maçã',
          'Laranja',
          'Limão',
          'Mamão',
          'Melancia',
          'Abacate',
          'Morango',
        ],
      },
      {
        label: 'Verduras',
        items: ['Alface', 'Rúcula', 'Couve', 'Espinafre', 'Repolho'],
      },
      {
        label: 'Legumes',
        items: [
          'Tomate',
          'Cebola',
          'Alho',
          'Cenoura',
          'Batata',
          'Mandioca',
          'Abobrinha',
          'Pimentão',
        ],
      },
    ],
  },
  {
    id: 'acougue-peixaria',
    title: '2. Açougue e Peixaria',
    subtitle: 'Proteínas',
    groups: [
      {
        label: 'Carnes Bovinas',
        items: ['Patinho', 'Alcatra', 'Acém', 'Carne Moída', 'Costela'],
      },
      {
        label: 'Aves',
        items: ['Peito de Frango', 'Coxa e Sobrecoxa', 'Frango inteiro'],
      },
      {
        label: 'Suínos e Embutidos',
        items: [
          'Lombo suíno',
          'Bacon',
          'Linguiça toscana',
          'Presunto',
          'Apresuntado',
          'Salsicha',
        ],
      },
      {
        label: 'Peixes e Frutos do Mar',
        items: ['Filé de Tilápia', 'Salmão', 'Camarão'],
      },
    ],
  },
  {
    id: 'laticinios-frios',
    title: '3. Laticínios e Frios',
    groups: [
      {
        items: [
          'Leite (Integral, Desnatado, Sem Lactose)',
          'Queijos (Mussarela, Prato, Minas, Parmesão ralado)',
          'Requeijão e Cream Cheese',
          'Manteiga e Margarina',
          'Iogurtes',
          'Creme de Leite e Leite Condensado',
        ],
      },
    ],
  },
  {
    id: 'padaria-cafe',
    title: '4. Padaria e Café da Manhã',
    groups: [
      {
        items: [
          'Pão francês / Pão de forma',
          'Pão integral',
          'Café em pó ou solúvel',
          'Chás variados',
          'Açúcar (Refinado, Cristal ou Demerara) / Adoçante',
          'Geleia e Mel',
          'Granola e Aveia',
          'Cereais matinais',
        ],
      },
    ],
  },
  {
    id: 'despensa-mercearia',
    title: '5. Despensa e Mercearia',
    groups: [
      {
        items: [
          'Arroz (Branco ou Integral)',
          'Feijão (Carioca, Preto ou Branco)',
          'Massas (Macarrão espaguete, parafuso, lasanha)',
          'Molho de tomate',
          'Óleo de soja / Azeite de oliva',
          'Farinhas (Trigo, Milho, Mandioca)',
          'Sal e Temperos prontos / Ervas secas',
          'Atum ou Sardinha em lata',
          'Milho e Ervilha em conserva',
          'Biscoitos (Recheados, Maisena, Water/Cream Cracker)',
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: '6. Bebidas',
    groups: [
      {
        items: [
          'Água mineral (com e sem gás)',
          'Refrigerantes',
          'Sucos (Caixa, pó ou concentrados)',
          'Cervejas, Vinhos ou outras bebidas alcoólicas',
        ],
      },
    ],
  },
  {
    id: 'limpeza',
    title: '7. Limpeza da Casa',
    groups: [
      {
        items: [
          'Detergente líquido',
          'Sabão em pó ou líquido para roupas',
          'Amaciante de roupas',
          'Desinfetante',
          'Água sanitária',
          'Limpador multiuso',
          'Esponjas de pia e Esponja de aço (lã de aço)',
          'Sacos de lixo (vários tamanhos)',
        ],
      },
    ],
  },
  {
    id: 'higiene-beleza',
    title: '8. Higiene Pessoal e Beleza',
    groups: [
      {
        items: [
          'Papel higiênico',
          'Sabonete (barra ou líquido)',
          'Shampoo e Condicionador',
          'Creme dental e Fio dental',
          'Desodorante',
          'Absorventes',
          'Cotonetes e Algodão',
        ],
      },
    ],
  },
  {
    id: 'utilidades-diversos',
    title: '9. Utilidades e Diversos',
    subtitle: 'Opcional',
    groups: [
      {
        items: [
          'Papel alumínio / Filme plástico',
          'Guardanapos de papel',
          'Pilhas (AA, AAA)',
          'Ração para pets (Cachorro / Gato)',
        ],
      },
    ],
  },
];

