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

export const PRODUCT_CATALOG_ES: CatalogCategory[] = [
  {
    id: 'hortifruti',
    title: '1. Frutas y Verduras',
    subtitle: 'Productos frescos',
    groups: [
      {
        label: 'Frutas',
        items: [
          'Plátano / Banana',
          'Manzana',
          'Naranja',
          'Limón',
          'Papaya',
          'Sandía',
          'Aguacate / Palta',
          'Fresa / Frutilla',
        ],
      },
      {
        label: 'Hojas Verdes',
        items: ['Lechuga', 'Rúcula', 'Col rizada / Kale', 'Espinaca', 'Repollo'],
      },
      {
        label: 'Verduras y Hortalizas',
        items: [
          'Tomate',
          'Cebolla',
          'Ajo',
          'Zanahoria',
          'Papa / Patata',
          'Yuca / Mandioca',
          'Calabacín',
          'Pimiento / Morrón',
        ],
      },
    ],
  },
  {
    id: 'acougue-peixaria',
    title: '2. Carnicería y Pescadería',
    subtitle: 'Proteínas',
    groups: [
      {
        label: 'Carne de Res / Vacuno',
        items: ['Solomillo / Lomo', 'Cadera / Cuadril', 'Aguja / Asado', 'Carne Molida / Picada', 'Costilla'],
      },
      {
        label: 'Aves',
        items: ['Pechuga de Pollo', 'Muslo y Contramuslo', 'Pollo Entero'],
      },
      {
        label: 'Cerdo y Embutidos',
        items: [
          'Lomo de cerdo',
          'Tocino / Panceta',
          'Chorizo / Longaniza',
          'Jamón cocido',
          'Pechuga de pavo',
          'Salchichas',
        ],
      },
      {
        label: 'Pescados y Mariscos',
        items: ['Filete de Tilapia / Merluza', 'Salmón', 'Camarones / Gambas'],
      },
    ],
  },
  {
    id: 'laticinios-frios',
    title: '3. Lácteos y Refrigerados',
    groups: [
      {
        items: [
          'Leche (Entera, Descremada, Sin Lactosa)',
          'Quesos (Mozzarella, Fresco, Parmesano rallado)',
          'Queso Crema / Untable',
          'Mantequilla y Margarina',
          'Yogures',
          'Crema de Leche / Nata y Leche Condensada',
        ],
      },
    ],
  },
  {
    id: 'padaria-cafe',
    title: '4. Panadería y Desayuno',
    groups: [
      {
        items: [
          'Pan fresco / Pan de molde',
          'Pan integral',
          'Café molido o instantáneo',
          'Tés e infusiones variadas',
          'Azúcar (Blanca, Morena) / Endulzante',
          'Mermelada y Miel',
          'Granola y Avena',
          'Cereales de desayuno',
        ],
      },
    ],
  },
  {
    id: 'despensa-mercearia',
    title: '5. Despensa y Abarrotes',
    groups: [
      {
        items: [
          'Arroz (Blanco o Integral)',
          'Frijoles / Porotos / Alubias',
          'Pastas (Espagueti, Tornillos, Lasaña)',
          'Salsa de tomate',
          'Aceite vegetal / Aceite de oliva virgen extra',
          'Harinas (Trigo, Maíz)',
          'Sal, Especias y Hierbas secas',
          'Atún o Sardinas en lata',
          'Maíz dulce y Guisantes en conserva',
          'Galletas dulces y saladas',
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
          'Agua mineral (con y sin gas)',
          'Refrescos / Gaseosas',
          'Jugos / Zumos',
          'Cervezas, Vinos o Bebidas alcohólicas',
        ],
      },
    ],
  },
  {
    id: 'limpeza',
    title: '7. Limpieza del Hogar',
    groups: [
      {
        items: [
          'Lavavajillas líquido',
          'Detergente para ropa (en polvo o líquido)',
          'Suavizante de ropa',
          'Desinfectante',
          'Lejía / Cloro / Lavandina',
          'Limpiador multiusos',
          'Esponjas de cocina y Fibra metálica',
          'Bolsas de basura (varios tamaños)',
        ],
      },
    ],
  },
  {
    id: 'higiene-beleza',
    title: '8. Cuidado Personal y Belleza',
    groups: [
      {
        items: [
          'Papel higiénico',
          'Jabón de tocador (barra o líquido)',
          'Champú y Acondicionador',
          'Pasta dental e Hilo dental',
          'Desodorante',
          'Toallas femeninas / Compresas',
          'Hisopos / Bastoncillos y Algodón',
        ],
      },
    ],
  },
  {
    id: 'utilidades-diversos',
    title: '9. Hogar y Otros',
    subtitle: 'Opcional',
    groups: [
      {
        items: [
          'Papel aluminio / Film transparente',
          'Servilletas y Papel de cocina',
          'Pilas (AA, AAA)',
          'Alimento para mascotas (Perro / Gato)',
        ],
      },
    ],
  },
];

export const PRODUCT_CATALOG_ZH: CatalogCategory[] = [
  {
    id: 'hortifruti',
    title: '1. 生鲜蔬果',
    subtitle: '水果、绿叶菜与根茎蔬菜',
    groups: [
      {
        label: '新鲜水果',
        items: [
          '香蕉',
          '苹果',
          '橙子 / 柑橘',
          '柠檬',
          '木瓜',
          '西瓜',
          '牛油果',
          '草莓',
        ],
      },
      {
        label: '绿叶蔬菜',
        items: ['生菜', '芝麻菜', '羽衣甘蓝 / 芥蓝', '菠菜', '卷心菜 / 包菜'],
      },
      {
        label: '家常蔬菜',
        items: [
          '西红柿 / 番茄',
          '洋葱',
          '大蒜',
          '胡萝卜',
          '土豆 / 马铃薯',
          '山药 / 木薯',
          '西葫芦',
          '彩椒 / 青椒',
        ],
      },
    ],
  },
  {
    id: 'acougue-peixaria',
    title: '2. 肉禽水产',
    subtitle: '优质蛋白',
    groups: [
      {
        label: '牛肉类',
        items: ['牛腩 / 牛腱', '牛排 / 西冷', '上脑牛肉', '牛肉糜 / 肉末', '牛仔骨 / 牛肋排'],
      },
      {
        label: '禽肉类',
        items: ['鸡胸肉', '鸡腿 / 琵琶腿', '整鸡'],
      },
      {
        label: '猪肉与熟食肉制品',
        items: [
          '猪里脊 / 梅花肉',
          '培根',
          '鲜香肠 / 烤肠',
          '切片火腿',
          '五花肉',
          '热狗肠',
        ],
      },
      {
        label: '鱼类与海鲜',
        items: ['罗非鱼片 / 巴沙鱼', '三文鱼', '鲜虾 / 虾仁'],
      },
    ],
  },
  {
    id: 'laticinios-frios',
    title: '3. 乳制品与冷藏',
    groups: [
      {
        items: [
          '牛奶（全脂、脱脂、零乳糖）',
          '奶酪 / 芝士（马苏里拉、切达、帕玛森）',
          '奶油奶酪 / 涂抹酱',
          '黄油与植物黄油',
          '酸奶',
          '淡奶油与炼乳',
        ],
      },
    ],
  },
  {
    id: 'padaria-cafe',
    title: '4. 烘焙与早餐',
    groups: [
      {
        items: [
          '法棍 / 切片吐司面包',
          '全麦面包',
          '咖啡豆 / 咖啡粉 / 速溶咖啡',
          '茗茶 / 茶包',
          '白砂糖 / 红糖 / 代糖',
          '果酱与蜂蜜',
          '麦片与燕麦',
          '早餐谷物脆',
        ],
      },
    ],
  },
  {
    id: 'despensa-mercearia',
    title: '5. 粮油干货与调味',
    groups: [
      {
        items: [
          '大米 / 糙米',
          '杂粮豆类（红豆、绿豆、黑豆）',
          '面条 / 意面 / 挂面',
          '番茄酱 / 意面酱',
          '食用油 / 特级初榨橄榄油',
          '面粉 / 玉米淀粉',
          '食盐、酱油、香料与调味品',
          '金枪鱼罐头 / 沙丁鱼罐头',
          '玉米粒与青豆罐头',
          '饼干与休闲零食',
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: '6. 酒水饮料',
    groups: [
      {
        items: [
          '矿泉水 / 气泡水',
          '碳酸饮料 / 汽水',
          '果汁与茶饮',
          '啤酒、红酒与其它酒类',
        ],
      },
    ],
  },
  {
    id: 'limpeza',
    title: '7. 家居清洁',
    groups: [
      {
        items: [
          '洗洁精',
          '洗衣液 / 洗衣粉 / 洗衣凝珠',
          '衣物柔顺剂',
          '消毒液',
          '漂白水 / 84消毒液',
          '多用途清洁剂',
          '百洁布 / 洗碗海绵 / 钢丝球',
          '垃圾袋（多种尺寸）',
        ],
      },
    ],
  },
  {
    id: 'higiene-beleza',
    title: '8. 个人护理与美妆',
    groups: [
      {
        items: [
          '卷纸 / 抽纸',
          '香皂 / 沐浴露',
          '洗发水与护发素',
          '牙膏与牙线',
          '止汗露 / 香体喷雾',
          '卫生巾 / 护理用品',
          '棉签与化妆棉',
        ],
      },
    ],
  },
  {
    id: 'utilidades-diversos',
    title: '9. 日用百货与其它',
    subtitle: '可选',
    groups: [
      {
        items: [
          '锡纸 / 保鲜膜 / 保鲜袋',
          '厨房纸巾 / 餐巾纸',
          '电池（5号 AA / 7号 AAA）',
          '宠物食品（狗粮 / 猫粮）',
        ],
      },
    ],
  },
];

export const PRODUCT_CATALOG = PRODUCT_CATALOG_PT;

const CATALOG_BY_LANG: Record<Language, CatalogCategory[]> = {
  pt: PRODUCT_CATALOG_PT,
  en: PRODUCT_CATALOG_EN,
  es: PRODUCT_CATALOG_ES,
  zh: PRODUCT_CATALOG_ZH,
};

export const getProductCatalog = (language: Language): CatalogCategory[] =>
  CATALOG_BY_LANG[language] || PRODUCT_CATALOG_PT;
