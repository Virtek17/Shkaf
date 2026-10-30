import type { RentalStage } from './rental-session';

export const stageContent: Record<RentalStage, { step: number; header: string; code: string; title: string }> = {
  checking: { step: 2, header: 'ПРОВЕРКА / 02', code: 'CHECKING / 02', title: 'ПРОВЕРЯЕМ\nДОСТУПНОСТЬ.' },
  unavailable: { step: 2, header: 'ПРОВЕРКА / 02', code: 'CHECKING / 02', title: 'ВЕЩЬ УЖЕ\nЗАНЯТА.' },
  payment: { step: 3, header: 'ОПЛАТА / 03', code: 'PAYMENT / 03', title: 'ОПЛАТИТЕ\nАРЕНДУ.' },
  paying: { step: 3, header: 'ОПЛАТА / 03', code: 'PAYMENT / 03', title: 'ПРОВЕРЯЕМ\nПЛАТЁЖ.' },
  'payment-error': { step: 3, header: 'ОПЛАТА / 03', code: 'PAYMENT / 03', title: 'ОПЛАТА\nНЕ ПРОШЛА.' },
  expired: { step: 3, header: 'БРОНЬ / 03', code: 'BOOKING / 03', title: 'ВРЕМЯ БРОНИ\nИСТЕКЛО.' },
  pickup: { step: 4, header: 'ПОЛУЧЕНИЕ / 04', code: 'PICKUP / 04', title: 'ВЕЩЬ ЖДЁТ\nВАС.' },
  opening: { step: 4, header: 'ПОЛУЧЕНИЕ / 04', code: 'PICKUP / 04', title: 'ОТКРЫВАЕМ\nЯЧЕЙКУ.' },
  'locker-error': { step: 4, header: 'ПОЛУЧЕНИЕ / 04', code: 'PICKUP / 04', title: 'ЯЧЕЙКА\nНЕ ОТКРЫЛАСЬ.' },
  kit: { step: 5, header: 'ПОЛУЧЕНИЕ / 05', code: 'CHECK KIT / 05', title: 'ПРОВЕРЬТЕ\nКОМПЛЕКТ.' },
  problem: { step: 5, header: 'ПОЛУЧЕНИЕ / 05', code: 'CHECK KIT / 05', title: 'ЧТО-ТО НЕ ТАК?' },
  'problem-sent': { step: 5, header: 'ПОДДЕРЖКА / 05', code: 'SUPPORT / 05', title: 'ОБРАЩЕНИЕ\nПОДГОТОВЛЕНО.' },
  active: { step: 6, header: 'АРЕНДА / 06', code: 'ACTIVE / 06', title: 'ВЕЩЬ У ВАС.' },
};
