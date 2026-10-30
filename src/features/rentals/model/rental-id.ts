let sequence = 0;
/** Идентификатор локального прототипа; в реальном сервисе rentalId выдаёт сервер. */
export const createRentalId = () => `demo-${Date.now().toString(36)}-${(++sequence).toString(36)}`;

