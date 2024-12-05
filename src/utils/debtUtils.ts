import { Debt, Payment } from '../types';
import { isWithinOneMonth, isSameMonth, startOfDay, endOfDay, addDays } from './dateUtils';

export function getUpcomingDebts(debts: Debt[]): Debt[] {
  const today = startOfDay(new Date());
  const oneMonthFromNow = addDays(today, 30);

  return debts.filter(debt => {
    if (debt.remainingAmount <= 0) return false;

    if (debt.type === 'ONE_TIME') {
      const dueDate = startOfDay(new Date(debt.dueDate));
      return dueDate >= today && dueDate <= oneMonthFromNow;
    }

    if (debt.type === 'PERIODIC') {
      const endDate = debt.endDate ? startOfDay(new Date(debt.endDate)) : null;
      return endDate ? (endDate >= today && endDate <= oneMonthFromNow) : false;
    }

    return false;
  });
}

export function getMonthlyPayment(debt: Debt, targetDate: Date): Payment | null {
  const today = startOfDay(new Date());

  if (debt.remainingAmount <= 0) return null;

  if (debt.type === 'ONE_TIME') {
    const dueDate = startOfDay(new Date(debt.dueDate));
    if (isSameMonth(dueDate, targetDate) && dueDate >= today) {
      return {
        id: debt.id,
        title: debt.title,
        amount: debt.remainingAmount,
        dueDate: debt.dueDate,
        categoryId: debt.categoryId,
        type: debt.type
      };
    }
  } else if (debt.type === 'PERIODIC' && debt.paymentDay) {
    const endDate = debt.endDate ? endOfDay(new Date(debt.endDate)) : null;
    const paymentDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      debt.paymentDay
    );

    if ((!endDate || paymentDate <= endDate) && paymentDate >= today) {
      return {
        id: debt.id,
        title: debt.title,
        amount: debt.paymentAmount || 0,
        dueDate: paymentDate.toISOString(),
        categoryId: debt.categoryId,
        type: debt.type
      };
    }
  }

  return null;
}

export function sortDebtsByDueDate(debts: Debt[]): Debt[] {
  return [...debts].sort((a, b) => {
    const dateA = new Date(a.type === 'ONE_TIME' ? a.dueDate : (a.endDate || a.dueDate));
    const dateB = new Date(b.type === 'ONE_TIME' ? b.dueDate : (b.endDate || b.dueDate));
    return dateA.getTime() - dateB.getTime();
  });
}