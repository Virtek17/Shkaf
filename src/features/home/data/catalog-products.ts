export type CatalogProduct = {
  id: string;
  name: string;
  price: number;
  photo: number;
  description?: string;
};

export const catalogProducts: CatalogProduct[] = [
  { id: '1', name: 'Дрель', price: 150, photo: require('@/assets/images/products/drel.jpg') },
  { id: '2', name: 'Наушники', price: 80, photo: require('@/assets/images/products/naushki.jpg') },
  { id: '3', name: 'Инструменты', price: 60, photo: require('@/assets/images/products/instruments.jpg') },
  { id: '4', name: 'Настольная играНастольная игра', price: 50, photo: require('@/assets/images/products/nastolka.jpg') },
  { id: '5', name: 'Колонка', price: 150, photo: require('@/assets/images/products/kolonka.jpg') },
  { id: '6', name: 'Плейстейшн', price: 80, photo: require('@/assets/images/products/playstation.jpg') },
  { id: '7', name: 'Повербанк', price: 60, photo: require('@/assets/images/products/powerbank.jpg') },
  { id: '8', name: 'Проектор', price: 50, photo: require('@/assets/images/products/projector.jpg') },
  { id: '9', name: 'Штатив', price: 150, photo: require('@/assets/images/products/shtativ.jpg') },
  { id: '10', name: 'Шуруповёрт', price: 80, photo: require('@/assets/images/products/shurik.jpg') },
];

export function getCatalogProduct(id: string) {
  return catalogProducts.find((product) => product.id === id);
}
