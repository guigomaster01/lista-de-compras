import React from 'react';

export type ProductIconType =
  | 'fruit'
  | 'banana'
  | 'apple'
  | 'citrus'
  | 'berry'
  | 'leafy'
  | 'vegetable'
  | 'carrot'
  | 'beef'
  | 'poultry'
  | 'pork'
  | 'seafood'
  | 'milk'
  | 'cheese'
  | 'yogurt'
  | 'bread'
  | 'coffee'
  | 'sweet'
  | 'grain'
  | 'pasta'
  | 'oil'
  | 'canned'
  | 'cookie'
  | 'water'
  | 'soda'
  | 'alcohol'
  | 'cleaning'
  | 'laundry'
  | 'hygiene'
  | 'dental'
  | 'pet'
  | 'battery'
  | 'utility'
  | 'generic';

const normalizeText = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const detectProductIconType = (
  itemName: string,
  category?: string
): ProductIconType => {
  const n = normalizeText(itemName);
  const c = category ? normalizeText(category) : '';

  // Frutas específicas
  if (n.includes('banana') || n.includes('platano') || itemName.includes('香蕉')) {
    return 'banana';
  }
  if (
    n.includes('maca') ||
    n.includes('apple') ||
    n.includes('manzana') ||
    itemName.includes('苹果')
  ) {
    return 'apple';
  }
  if (
    n.includes('laranja') ||
    n.includes('limao') ||
    n.includes('orange') ||
    n.includes('lemon') ||
    n.includes('lime') ||
    n.includes('naranja') ||
    n.includes('limon') ||
    itemName.includes('橙') ||
    itemName.includes('柠檬')
  ) {
    return 'citrus';
  }
  if (
    n.includes('morango') ||
    n.includes('strawberry') ||
    n.includes('fresa') ||
    n.includes('frutilla') ||
    n.includes('melancia') ||
    n.includes('watermelon') ||
    n.includes('sandia') ||
    itemName.includes('草莓') ||
    itemName.includes('西瓜')
  ) {
    return 'berry';
  }
  if (
    n.includes('mamao') ||
    n.includes('abacate') ||
    n.includes('papaya') ||
    n.includes('avocado') ||
    n.includes('aguacate') ||
    n.includes('palta') ||
    itemName.includes('木瓜') ||
    itemName.includes('牛油果')
  ) {
    return 'fruit';
  }

  // Verduras e Legumes
  if (
    n.includes('alface') ||
    n.includes('rucula') ||
    n.includes('couve') ||
    n.includes('espinafre') ||
    n.includes('repolho') ||
    n.includes('lettuce') ||
    n.includes('arugula') ||
    n.includes('kale') ||
    n.includes('spinach') ||
    n.includes('cabbage') ||
    n.includes('lechuga') ||
    n.includes('espinaca') ||
    itemName.includes('生菜') ||
    itemName.includes('芝麻菜') ||
    itemName.includes('甘蓝') ||
    itemName.includes('菠菜') ||
    itemName.includes('包菜')
  ) {
    return 'leafy';
  }
  if (
    n.includes('cenoura') ||
    n.includes('carrot') ||
    n.includes('zanahoria') ||
    itemName.includes('胡萝卜')
  ) {
    return 'carrot';
  }
  if (
    n.includes('tomate') ||
    n.includes('cebola') ||
    n.includes('alho') ||
    n.includes('batata') ||
    n.includes('mandioca') ||
    n.includes('abobrinha') ||
    n.includes('pimentao') ||
    n.includes('tomato') ||
    n.includes('onion') ||
    n.includes('garlic') ||
    n.includes('potato') ||
    n.includes('cassava') ||
    n.includes('zucchini') ||
    n.includes('pepper') ||
    n.includes('cebolla') ||
    n.includes('ajo') ||
    n.includes('papa') ||
    n.includes('calabacin') ||
    n.includes('pimiento') ||
    itemName.includes('番茄') ||
    itemName.includes('西红柿') ||
    itemName.includes('洋葱') ||
    itemName.includes('大蒜') ||
    itemName.includes('土豆') ||
    itemName.includes('山药') ||
    itemName.includes('西葫芦') ||
    itemName.includes('椒')
  ) {
    return 'vegetable';
  }

  // Carnes, Aves e Peixes
  if (
    n.includes('frango') ||
    n.includes('coxa') ||
    n.includes('chicken') ||
    n.includes('poultry') ||
    n.includes('turkey') ||
    n.includes('pollo') ||
    n.includes('pavo') ||
    itemName.includes('鸡')
  ) {
    return 'poultry';
  }
  if (
    n.includes('peixe') ||
    n.includes('tilapia') ||
    n.includes('salmao') ||
    n.includes('camarao') ||
    n.includes('salmon') ||
    n.includes('shrimp') ||
    n.includes('seafood') ||
    n.includes('merluza') ||
    n.includes('camaron') ||
    itemName.includes('鱼') ||
    itemName.includes('虾')
  ) {
    return 'seafood';
  }
  if (
    n.includes('suino') ||
    n.includes('bacon') ||
    n.includes('linguica') ||
    n.includes('presunto') ||
    n.includes('apresuntado') ||
    n.includes('salsicha') ||
    n.includes('pork') ||
    n.includes('sausage') ||
    n.includes('ham') ||
    n.includes('hot dog') ||
    n.includes('cerdo') ||
    n.includes('tocino') ||
    n.includes('chorizo') ||
    n.includes('jamon') ||
    n.includes('salchicha') ||
    itemName.includes('猪') ||
    itemName.includes('培根') ||
    itemName.includes('香肠') ||
    itemName.includes('火腿') ||
    itemName.includes('五花肉') ||
    itemName.includes('热狗')
  ) {
    return 'pork';
  }
  if (
    n.includes('patinho') ||
    n.includes('alcatra') ||
    n.includes('acem') ||
    n.includes('carne') ||
    n.includes('costela') ||
    n.includes('sirloin') ||
    n.includes('steak') ||
    n.includes('roast') ||
    n.includes('beef') ||
    n.includes('ribs') ||
    n.includes('solomillo') ||
    n.includes('lomo') ||
    n.includes('cuadril') ||
    n.includes('asado') ||
    n.includes('costilla') ||
    itemName.includes('牛')
  ) {
    return 'beef';
  }

  // Laticínios
  if (
    n.includes('queijo') ||
    n.includes('mussarela') ||
    n.includes('parmesao') ||
    n.includes('cheese') ||
    n.includes('queso') ||
    itemName.includes('奶酪') ||
    itemName.includes('芝士')
  ) {
    return 'cheese';
  }
  if (
    n.includes('leite') ||
    n.includes('milk') ||
    n.includes('leche') ||
    itemName.includes('牛奶') ||
    itemName.includes('炼乳')
  ) {
    return 'milk';
  }
  if (
    n.includes('iogurte') ||
    n.includes('requeijao') ||
    n.includes('manteiga') ||
    n.includes('margarina') ||
    n.includes('yogurt') ||
    n.includes('butter') ||
    n.includes('cream') ||
    n.includes('mantequilla') ||
    itemName.includes('酸奶') ||
    itemName.includes('黄油') ||
    itemName.includes('奶油')
  ) {
    return 'yogurt';
  }

  // Padaria e Café
  if (
    n.includes('pao') ||
    n.includes('bread') ||
    n.includes('pan ') ||
    n.startsWith('pan') ||
    itemName.includes('面包') ||
    itemName.includes('吐司') ||
    itemName.includes('法棍')
  ) {
    return 'bread';
  }
  if (
    n.includes('cafe') ||
    n.includes('cha') ||
    n.includes('coffee') ||
    n.includes('tea') ||
    n.includes('infusion') ||
    itemName.includes('咖啡') ||
    itemName.includes('茶')
  ) {
    return 'coffee';
  }
  if (
    n.includes('acucar') ||
    n.includes('adocante') ||
    n.includes('geleia') ||
    n.includes('mel') ||
    n.includes('sugar') ||
    n.includes('jam') ||
    n.includes('honey') ||
    n.includes('azucar') ||
    n.includes('mermelada') ||
    n.includes('miel') ||
    itemName.includes('糖') ||
    itemName.includes('果酱') ||
    itemName.includes('蜂蜜')
  ) {
    return 'sweet';
  }

  // Despensa e Mercearia
  if (
    n.includes('massa') ||
    n.includes('macarrao') ||
    n.includes('espaguete') ||
    n.includes('pasta') ||
    n.includes('spaghetti') ||
    n.includes('lasagna') ||
    itemName.includes('面条') ||
    itemName.includes('意面')
  ) {
    return 'pasta';
  }
  if (
    n.includes('azeite') ||
    n.includes('oleo') ||
    n.includes('molho') ||
    n.includes('oil') ||
    n.includes('sauce') ||
    n.includes('aceite') ||
    n.includes('salsa') ||
    itemName.includes('油') ||
    itemName.includes('酱')
  ) {
    return 'oil';
  }
  if (
    n.includes('lata') ||
    n.includes('conserva') ||
    n.includes('atum') ||
    n.includes('sardinha') ||
    n.includes('canned') ||
    n.includes('tuna') ||
    n.includes('atun') ||
    itemName.includes('罐头')
  ) {
    return 'canned';
  }
  if (
    n.includes('biscoito') ||
    n.includes('bolacha') ||
    n.includes('cookie') ||
    n.includes('cracker') ||
    n.includes('galleta') ||
    itemName.includes('饼干') ||
    itemName.includes('零食')
  ) {
    return 'cookie';
  }
  if (
    n.includes('arroz') ||
    n.includes('feijao') ||
    n.includes('farinha') ||
    n.includes('granola') ||
    n.includes('aveia') ||
    n.includes('cereais') ||
    n.includes('sal') ||
    n.includes('tempero') ||
    n.includes('rice') ||
    n.includes('beans') ||
    n.includes('flour') ||
    n.includes('oats') ||
    n.includes('cereal') ||
    n.includes('salt') ||
    n.includes('frijol') ||
    n.includes('harina') ||
    n.includes('avena') ||
    itemName.includes('米') ||
    itemName.includes('豆') ||
    itemName.includes('面粉') ||
    itemName.includes('麦片') ||
    itemName.includes('谷物') ||
    itemName.includes('盐')
  ) {
    return 'grain';
  }

  // Bebidas
  if (
    n.includes('cerveja') ||
    n.includes('vinho') ||
    n.includes('alcool') ||
    n.includes('beer') ||
    n.includes('wine') ||
    n.includes('spirits') ||
    n.includes('cerveza') ||
    n.includes('vino') ||
    itemName.includes('啤酒') ||
    itemName.includes('红酒') ||
    itemName.includes('酒')
  ) {
    return 'alcohol';
  }
  if (
    n.includes('refrigerante') ||
    n.includes('suco') ||
    n.includes('soda') ||
    n.includes('juice') ||
    n.includes('refresco') ||
    n.includes('gaseosa') ||
    n.includes('jugo') ||
    n.includes('zumo') ||
    itemName.includes('汽水') ||
    itemName.includes('饮料') ||
    itemName.includes('果汁')
  ) {
    return 'soda';
  }
  if (
    n.includes('agua mineral') ||
    n.includes('bottled water') ||
    n.includes('sparkling') ||
    itemName.includes('矿泉水') ||
    itemName.includes('气泡水')
  ) {
    return 'water';
  }

  // Limpeza
  if (
    n.includes('sabao') ||
    n.includes('amaciante') ||
    n.includes('laundry') ||
    n.includes('softener') ||
    n.includes('ropa') ||
    n.includes('suavizante') ||
    itemName.includes('洗衣') ||
    itemName.includes('柔顺剂')
  ) {
    return 'laundry';
  }
  if (
    n.includes('detergente') ||
    n.includes('desinfetante') ||
    n.includes('sanitaria') ||
    n.includes('limpador') ||
    n.includes('esponja') ||
    n.includes('lixo') ||
    n.includes('dish soap') ||
    n.includes('disinfectant') ||
    n.includes('bleach') ||
    n.includes('cleaner') ||
    n.includes('sponge') ||
    n.includes('trash') ||
    n.includes('lavavajillas') ||
    n.includes('lejia') ||
    n.includes('basura') ||
    itemName.includes('洗洁精') ||
    itemName.includes('消毒') ||
    itemName.includes('漂白') ||
    itemName.includes('清洁') ||
    itemName.includes('海绵') ||
    itemName.includes('垃圾袋')
  ) {
    return 'cleaning';
  }

  // Higiene
  if (
    n.includes('dental') ||
    n.includes('dente') ||
    n.includes('toothpaste') ||
    n.includes('floss') ||
    itemName.includes('牙')
  ) {
    return 'dental';
  }
  if (
    n.includes('higienico') ||
    n.includes('sabonete') ||
    n.includes('shampoo') ||
    n.includes('condicionador') ||
    n.includes('desodorante') ||
    n.includes('absorvente') ||
    n.includes('cotonete') ||
    n.includes('algodao') ||
    n.includes('toilet') ||
    n.includes('soap') ||
    n.includes('deodorant') ||
    n.includes('pads') ||
    n.includes('cotton') ||
    n.includes('jabon') ||
    n.includes('champu') ||
    n.includes('toalla') ||
    n.includes('hisopo') ||
    itemName.includes('纸') ||
    itemName.includes('香皂') ||
    itemName.includes('沐浴') ||
    itemName.includes('洗发') ||
    itemName.includes('止汗') ||
    itemName.includes('卫生巾') ||
    itemName.includes('棉')
  ) {
    return 'hygiene';
  }

  // Utilidades e Pets
  if (
    n.includes('racao') ||
    n.includes('pet') ||
    n.includes('cachorro') ||
    n.includes('gato') ||
    n.includes('dog') ||
    n.includes('cat') ||
    n.includes('mascota') ||
    n.includes('perro') ||
    itemName.includes('宠') ||
    itemName.includes('狗') ||
    itemName.includes('猫')
  ) {
    return 'pet';
  }
  if (
    n.includes('pilha') ||
    n.includes('batter') ||
    n.includes('pila') ||
    itemName.includes('电池')
  ) {
    return 'battery';
  }
  if (
    n.includes('aluminio') ||
    n.includes('filme') ||
    n.includes('guardanapo') ||
    n.includes('foil') ||
    n.includes('wrap') ||
    n.includes('napkin') ||
    n.includes('servilleta') ||
    itemName.includes('锡纸') ||
    itemName.includes('保鲜膜')
  ) {
    return 'utility';
  }

  // Fallback por Categoria
  if (
    c.includes('hortifruti') ||
    c.includes('produce') ||
    c.includes('frutas') ||
    category?.includes('蔬果')
  ) {
    return 'fruit';
  }
  if (
    c.includes('acougue') ||
    c.includes('meat') ||
    c.includes('carniceria') ||
    category?.includes('肉')
  ) {
    return 'beef';
  }
  if (
    c.includes('laticinios') ||
    c.includes('dairy') ||
    c.includes('lacteos') ||
    category?.includes('乳')
  ) {
    return 'milk';
  }
  if (
    c.includes('padaria') ||
    c.includes('bakery') ||
    c.includes('panaderia') ||
    category?.includes('烘焙')
  ) {
    return 'bread';
  }
  if (
    c.includes('despensa') ||
    c.includes('mercearia') ||
    c.includes('pantry') ||
    c.includes('abarrotes') ||
    category?.includes('粮油')
  ) {
    return 'grain';
  }
  if (
    c.includes('bebidas') ||
    c.includes('beverages') ||
    category?.includes('饮料')
  ) {
    return 'soda';
  }
  if (
    c.includes('limpeza') ||
    c.includes('cleaning') ||
    category?.includes('清洁')
  ) {
    return 'cleaning';
  }
  if (
    c.includes('higiene') ||
    c.includes('personal') ||
    c.includes('cuidado') ||
    category?.includes('护理')
  ) {
    return 'hygiene';
  }
  if (
    c.includes('utilidades') ||
    c.includes('essentials') ||
    c.includes('hogar') ||
    category?.includes('百货')
  ) {
    return 'utility';
  }

  return 'generic';
};

const ICON_BADGE_STYLES: Record<ProductIconType, string> = {
  fruit: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  banana: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  apple: 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400',
  citrus: 'bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
  berry: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  leafy: 'bg-green-50 text-green-600 dark:bg-green-950/60 dark:text-green-400',
  vegetable: 'bg-lime-50 text-lime-600 dark:bg-lime-950/60 dark:text-lime-400',
  carrot: 'bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
  beef: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400',
  poultry: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
  pork: 'bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400',
  seafood: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400',
  milk: 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
  cheese: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/60 dark:text-yellow-400',
  yogurt: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
  bread: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
  coffee: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
  sweet: 'bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400',
  grain: 'bg-amber-50/80 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  pasta: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400',
  oil: 'bg-lime-50 text-lime-700 dark:bg-lime-950/60 dark:text-lime-400',
  canned: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  cookie: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  water: 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
  soda: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
  alcohol: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  cleaning: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400',
  laundry: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
  hygiene: 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400',
  dental: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400',
  pet: 'bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
  battery: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  utility: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
  generic: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

const renderIconSvg = (type: ProductIconType, className = 'w-4 h-4') => {
  switch (type) {
    case 'apple':
    case 'fruit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
      );
    case 'banana':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" />
          <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" />
        </svg>
      );
    case 'citrus':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );
    case 'berry':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5c-4.5 0-7 3.5-7 7.5 0 4.5 4.5 9.5 7 9.5s7-5 7-9.5C19 8.5 16.5 5 12 5Z" />
          <path d="m9 2 3 3 3-3M10 11h.01M14 11h.01M12 15h.01" />
        </svg>
      );
    case 'leafy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case 'carrot':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7z" />
          <path d="M15.4 8.6 17 7m-1.6 1.6L19 10m-3.6-1.4L14 5" />
        </svg>
      );
    case 'vegetable':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 2v3m-3 0 3 2 3-2" />
        </svg>
      );
    case 'beef':
    case 'pork':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4.5c3 0 5.5 2.5 5.5 5.5 0 4.5-5.5 9.5-10 9.5-3.5 0-6-2.5-6-5.5 0-4.5 5.5-9.5 10.5-9.5Z" />
          <circle cx="14" cy="10" r="2" />
        </svg>
      );
    case 'poultry':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.5 5.5a5 5 0 0 1 0 7.07l-3.54 3.54a3 3 0 0 1-4.24 0l-.71-.71a3 3 0 0 1 0-4.24l3.54-3.54a5 5 0 0 1 4.95-2.12Z" />
          <path d="m7.7 14.3-2.5 2.5a1.5 1.5 0 1 0 2.1 2.1l2.5-2.5" />
        </svg>
      );
    case 'seafood':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
          <path d="M2 8l4.5 4L2 16v-8Z" />
          <circle cx="17" cy="11" r="1" />
        </svg>
      );
    case 'milk':
    case 'yogurt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2h8l2 5v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l2-5Z" />
          <path d="M6 10h12" />
        </svg>
      );
    case 'cheese':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l11-7 7 7v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
          <path d="M3 11h18" />
          <circle cx="9" cy="15.5" r="1.2" />
          <circle cx="15" cy="16" r="1" />
        </svg>
      );
    case 'bread':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 11a4 4 0 0 1 2-7.5 8 8 0 0 1 10 0A4 4 0 0 1 19 11v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z" />
        </svg>
      );
    case 'coffee':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      );
    case 'sweet':
    case 'cookie':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="9.5" cy="9.5" r="1" />
          <circle cx="14.5" cy="10.5" r="1" />
          <circle cx="10.5" cy="14.5" r="1" />
          <circle cx="14.5" cy="14.5" r="1" />
        </svg>
      );
    case 'grain':
    case 'pasta':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" />
          <path d="M12 6c-2.5 0-4.5-2-4.5-4 2.5 0 4.5 2 4.5 4Zm0 0c2.5 0 4.5-2 4.5-4-2.5 0-4.5 2-4.5 4Z" />
          <path d="M12 11c-2.5 0-4.5-2-4.5-4 2.5 0 4.5 2 4.5 4Zm0 0c2.5 0 4.5-2 4.5-4-2.5 0-4.5 2-4.5 4Z" />
          <path d="M12 16c-2.5 0-4.5-2-4.5-4 2.5 0 4.5 2 4.5 4Zm0 0c2.5 0 4.5-2 4.5-4-2.5 0-4.5 2-4.5 4Z" />
        </svg>
      );
    case 'oil':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2h4v4l3 4v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10l3-4V2Z" />
          <path d="M12 13a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2a2 2 0 0 0-2-2Z" />
        </svg>
      );
    case 'canned':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
          <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
        </svg>
      );
    case 'water':
    case 'soda':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 8h10l-1 13H8L7 8Z" />
          <path d="M6 8h12M12 8V4l3-2" />
        </svg>
      );
    case 'alcohol':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
          <path d="M7.5 9h9" />
        </svg>
      );
    case 'cleaning':
    case 'laundry':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6v3l3 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10l3-4V3Z" />
          <path d="M12 2v1M15 4h3l1 2" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>
      );
    case 'hygiene':
    case 'dental':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6h6v3a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8a3 3 0 0 1 3-3V6Z" />
          <path d="M12 2v4M9 3h6" />
        </svg>
      );
    case 'pet':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="4" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="20" cy="16" r="2" />
          <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
        </svg>
      );
    case 'battery':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <line x1="22" x2="22" y1="11" y2="13" />
          <line x1="7" x2="7" y1="10" y2="14" />
          <line x1="13" x2="13" y1="10" y2="14" />
        </svg>
      );
    case 'utility':
    case 'generic':
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
  }
};

export const ProductIcon: React.FC<{
  name: string;
  category?: string;
  size?: 'sm' | 'md';
  variant?: 'badge' | 'inline';
}> = ({ name, category, size = 'md', variant = 'badge' }) => {
  const type = detectProductIconType(name, category);

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center justify-center flex-shrink-0">
        {renderIconSvg(type, size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')}
      </span>
    );
  }

  const badgeSize = size === 'sm' ? 'w-6 h-6 rounded-md' : 'w-7 h-7 rounded-lg';
  const svgSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${badgeSize} ${ICON_BADGE_STYLES[type]}`}
      aria-hidden="true"
    >
      {renderIconSvg(type, svgSize)}
    </span>
  );
};

