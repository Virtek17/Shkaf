import type { Product } from '../model/product';

const demoPickupPoint = { name: 'Университет', address: 'Главный корпус · 1 этаж' };

// Демонстрационное наполнение: комплект и состояние нужно сверить с реальными вещами.
export const catalogProducts: Product[] = [
  {
    id: '06ff9cf1-2c74-41a1-90c9-56a7d9638ff6', displayCode: 'ID_E25809', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Дрель', category: 'technology', pricePerHour: 150,
    photo: require('@/assets/images/products/drel.jpg'),
    description: 'Для небольшого ремонта и работы по дому.',
    included: ['Дрель', 'Боковая рукоятка', 'Ограничитель глубины', 'Кейс'],
    condition: { label: 'Хорошее', details: 'Есть небольшие следы использования на корпусе.' },
    notes: [{ label: 'Расходники', value: 'Свёрла подбираются отдельно.' }],
  },
  {
    id: '8828b1ed-ef06-44f0-be7d-0f4941448d70', displayCode: 'ID_DD021D', status: 'rented', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Наушники', category: 'technology', pricePerHour: 80,
    photo: require('@/assets/images/products/naushki.jpg'),
    description: 'Для музыки, учёбы и прогулок.',
    included: ['Наушники', 'Кабель для зарядки', 'Чехол'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Перед возвратом', value: 'Положите кабель и наушники в чехол.' }],
  },
  {
    id: '912b3088-78d4-473c-9b01-4aa9b21815dc', displayCode: 'ID_BF9712', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Инструменты', category: 'technology', pricePerHour: 60,
    photo: require('@/assets/images/products/instruments.jpg'),
    description: 'Набор для сборки мебели и небольших домашних работ.',
    included: ['Кейс', 'Отвёртки', 'Набор бит и головок', 'Ключи', 'Плоскогубцы'],
    condition: { label: 'Хорошее', details: 'На отдельных инструментах есть следы использования.' },
    notes: [{ label: 'Возврат', value: 'Верните все инструменты на свои места в кейсе.' }],
  },
  {
    id: '0ed91ba9-e1f6-431c-b4f9-78d5fbc9a768', displayCode: 'ID_29AFEC', status: 'available', pickupPointId: 'library', pickupPoint: { name: 'Библиотека', address: 'Холл · 1 этаж' }, name: 'Настольная игра', category: 'leisure', pricePerHour: 50,
    photo: require('@/assets/images/products/nastolka.jpg'),
    description: 'Для вечера в компании и совместного отдыха.',
    included: ['Коробка', 'Игровое поле', 'Игровые элементы', 'Правила'],
    condition: { label: 'Хорошее', details: 'На коробке есть небольшие потёртости.' },
    notes: [{ label: 'Комплектность', value: 'Проверьте игровые элементы перед началом партии.' }],
  },
  {
    id: 'fffa6aaa-ca46-4e92-a552-bb1aed36ee82', displayCode: 'ID_489537', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Колонка', category: 'technology', pricePerHour: 150,
    photo: require('@/assets/images/products/kolonka.jpg'),
    description: 'Портативная колонка для музыки дома и на встречах с друзьями.',
    included: ['Колонка', 'Кабель для зарядки'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Подключение', value: 'Bluetooth' }],
  },
  {
    id: 'f8089615-8af5-4554-b3ea-7a5309eaff36', displayCode: 'ID_A9B0E4', status: 'rented', pickupPointId: 'library', pickupPoint: { name: 'Библиотека', address: 'Холл · 1 этаж' }, name: 'Плейстейшн', category: 'leisure', pricePerHour: 80,
    photo: require('@/assets/images/products/playstation.jpg'),
    description: 'Игровая приставка для отдыха и совместных игр.',
    included: ['Консоль', 'Геймпад', 'Кабель питания', 'HDMI-кабель', 'Кабель для геймпада'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Для подключения', value: 'Нужен телевизор или монитор с HDMI.' }],
  },
  {
    id: 'c6191ded-87b0-449d-9ffd-37228c2bdd62', displayCode: 'ID_2BCE71', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Повербанк', category: 'technology', pricePerHour: 60,
    photo: require('@/assets/images/products/powerbank.jpg'),
    description: 'Резервное питание для телефона в дороге и на прогулке.',
    included: ['Повербанк', 'Кабель для зарядки'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Совместимость', value: 'Проверьте разъём кабеля своего устройства.' }],
  },
  {
    id: 'a1cfd427-f9bf-410b-95e6-96d94f8b65f1', displayCode: 'ID_C187B6', status: 'rented', pickupPointId: 'library', pickupPoint: { name: 'Библиотека', address: 'Холл · 1 этаж' }, name: 'Проектор', category: 'technology', pricePerHour: 50,
    photo: require('@/assets/images/products/projector.jpg'),
    description: 'Для домашних кинопоказов и презентаций.',
    included: ['Проектор', 'Кабель питания', 'HDMI-кабель', 'Пульт'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Для показа', value: 'Подготовьте светлую стену или экран.' }],
  },
  {
    id: 'fa9e5adf-08d0-4f64-ba06-51994cbe0887', displayCode: 'ID_ACCB27', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Штатив', category: 'technology', pricePerHour: 150,
    photo: require('@/assets/images/products/shtativ.jpg'),
    description: 'Для устойчивой съёмки фото и видео.',
    included: ['Штатив', 'Съёмная площадка', 'Чехол'],
    condition: { label: 'Хорошее' },
    notes: [{ label: 'Перед съёмкой', value: 'Проверьте крепление камеры и фиксаторы ножек.' }],
  },
  {
    id: 'c1246246-d5a5-42aa-933f-d1cef037a00c', displayCode: 'ID_C61836', status: 'available', pickupPointId: 'university', pickupPoint: demoPickupPoint, name: 'Шуруповёрт', category: 'technology', pricePerHour: 80,
    photo: require('@/assets/images/products/shurik.jpg'),
    description: 'Для сборки мебели и работы с крепежом.',
    included: ['Шуруповёрт', 'Аккумулятор', 'Зарядное устройство', 'Кейс'],
    condition: { label: 'Хорошее', details: 'Есть следы использования на рукоятке.' },
    notes: [{ label: 'Расходники', value: 'Биты и крепёж подбираются под вашу задачу.' }],
  },
];

