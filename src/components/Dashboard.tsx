import React from 'react';
import { useDebt } from '../context/DebtContext';
import DebtOverview from './dashboard/DebtOverview';
import MonthlyPayments from './dashboard/MonthlyPayments';
import { Payment } from '../types';
import { getMonthlyPayment, getUpcomingDebts, sortDebtsByDueDate } from '../utils/debtUtils';
import { getNextMonth, startOfDay } from '../utils/dateUtils';

export default function Dashboard() {
  const { state: debtState } = useDebt();
  const debts = debtState.debts;

  // 计算总债务
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);

  // 获取当前月和下个月的还款信息
  const today = startOfDay(new Date());
  const nextMonth = getNextMonth(today);

  const getMonthlyPayments = (targetDate: Date): Payment[] => {
    return debts
      .map(debt => getMonthlyPayment(debt, targetDate))
      .filter((payment): payment is Payment => payment !== null);
  };

  const currentMonthPayments = getMonthlyPayments(today);
  const nextMonthPayments = getMonthlyPayments(nextMonth);

  const totalCurrentMonthPayment = currentMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalNextMonthPayment = nextMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);

  // 获取即将到期的债务
  const upcomingDebts = sortDebtsByDueDate(getUpcomingDebts(debts));

  return (
    <div className="space-y-6">


      <DebtOverview
        totalDebt={totalDebt}
        currentMonthPayment={totalCurrentMonthPayment}
        nextMonthPayment={totalNextMonthPayment}
        nearlyCompletedDebts={upcomingDebts}
      />

      <MonthlyPayments
        payments={currentMonthPayments}
        title="本月应还明细"
      />

      <MonthlyPayments
        payments={nextMonthPayments}
        title="下月应还明细"
      />
    </div>
  );
}