import type { CatalogCategory, Language } from '../types';

export const PRODUCT_CATALOG_PT: CatalogCategory[] = [
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

export const PRODUCT_CATALOG_EN: CatalogCategory[] = [
  {
    id: 'hortifruti',
    title: '1. Produce',
    subtitle: 'Fruits, Greens & Vegetables',
    groups: [
      {
        label: 'Fruits',
        items: [
          'Banana',
          'Apple',
          'Orange',
          'Lemon / Lime',
          'Papaya',
          'Watermelon',
          'Avocado',
          'Strawberry',
        ],
      },
      {
        label: 'Leafy Greens',
        items: ['Lettuce', 'Arugula', 'Kale', 'Spinach', 'Cabbage'],
      },
      {
        label: 'Vegetables',
        items: [
          'Tomato',
          'Onion',
          'Garlic',
          'Carrot',
          'Potato',
          'Cassava / Yuca',
          'Zucchini',
          'Bell Pepper',
        ],
      },
    ],
  },
  {
    id: 'acougue-peixaria',
    title: '2. Meat & Seafood',
    subtitle: 'Proteins',
    groups: [
      {
        label: 'Beef',
        items: ['Sirloin', 'Rump Steak', 'Chuck Roast', 'Ground Beef', 'Beef Ribs'],
      },
      {
        label: 'Poultry',
        items: ['Chicken Breast', 'Chicken Thighs & Drumsticks', 'Whole Chicken'],
      },
      {
        label: 'Pork & Deli Meats',
        items: [
          'Pork Loin',
          'Bacon',
          'Pork Sausage',
          'Sliced Ham',
          'Turkey Breast',
          'Hot Dogs / Franks',
        ],
      },
      {
        label: 'Fish & Seafood',
        items: ['Tilapia Fillet', 'Salmon', 'Shrimp'],
      },
    ],
  },
  {
    id: 'laticinios-frios',
    title: '3. Dairy & Chilled',
    groups: [
      {
        items: [
          'Milk (Whole, Skim, Lactose-Free)',
          'Cheese (Mozzarella, Cheddar, Parmesan)',
          'Cream Cheese & Spreads',
          'Butter & Margarine',
          'Yogurt',
          'Heavy Cream & Condensed Milk',
        ],
      },
    ],
  },
  {
    id: 'padaria-cafe',
    title: '4. Bakery & Breakfast',
    groups: [
      {
        items: [
          'French Bread / Sliced Bread',
          'Whole Wheat Bread',
          'Ground or Instant Coffee',
          'Assorted Teas',
          'Sugar (White, Brown, Raw) / Sweetener',
          'Jam & Honey',
          'Granola & Oats',
          'Breakfast Cereal',
        ],
      },
    ],
  },
  {
    id: 'despensa-mercearia',
    title: '5. Pantry & Groceries',
    groups: [
      {
        items: [
          'Rice (White or Brown)',
          'Beans (Pinto, Black or White)',
          'Pasta (Spaghetti, Penne, Lasagna)',
          'Tomato Sauce',
          'Cooking Oil / Extra Virgin Olive Oil',
          'Flour (All-Purpose, Cornmeal, Cassava)',
          'Salt, Spices & Dried Herbs',
          'Canned Tuna or Sardines',
          'Canned Corn & Peas',
          'Cookies & Crackers',
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: '6. Beverages',
    groups: [
      {
        items: [
          'Bottled Water (Still & Sparkling)',
          'Soda & Soft Drinks',
          'Juices (Carton, Powder or Concentrate)',
          'Beer, Wine & Spirits',
        ],
      },
    ],
  },
  {
    id: 'limpeza',
    title: '7. Household Cleaning',
    groups: [
      {
        items: [
          'Dish Soap',
          'Laundry Detergent (Liquid or Powder)',
          'Fabric Softener',
          'Disinfectant',
          'Bleach',
          'All-Purpose Cleaner',
          'Kitchen Sponges & Steel Wool',
          'Trash Bags (Assorted Sizes)',
        ],
      },
    ],
  },
  {
    id: 'higiene-beleza',
    title: '8. Personal Care & Beauty',
    groups: [
      {
        items: [
          'Toilet Paper',
          'Bar Soap / Body Wash',
          'Shampoo & Conditioner',
          'Toothpaste & Dental Floss',
          'Deodorant',
          'Feminine Care Pads',
          'Cotton Swabs & Cotton Balls',
        ],
      },
    ],
  },
  {
    id: 'utilidades-diversos',
    title: '9. Household Essentials & Misc',
    subtitle: 'Optional',
    groups: [
      {
        items: [
          'Aluminum Foil / Plastic Wrap',
          'Paper Napkins & Paper Towels',
          'Batteries (AA, AAA)',
          'Pet Food (Dog / Cat)',
        ],
      },
    ],
  },
];

export const PRODUCT_CATALOG = PRODUCT_CATALOG_PT;

export const getProductCatalog = (language: Language): CatalogCategory[] =>
  language === 'en' ? PRODUCT_CATALOG_EN : PRODUCT_CATALOG_PT;
