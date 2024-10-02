import { OrderStatus } from "./types";

export const formattedNumber = (number: number) => number.toLocaleString('ru-RU').replace(/\u00A0/g, ' ');

export const getStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CREATED:
      return 'Создан';
    case OrderStatus.PENDING:
      return 'Готовится';
    case OrderStatus.DONE:
      return 'Выполнен';
    default:
      return '';
  }
}