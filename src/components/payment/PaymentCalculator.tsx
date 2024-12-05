import React, { useState } from 'react';
import { Debt, PaymentStrategy } from '../../types';
import { Calculator, TrendingDown } from 'lucide-react';

interface PaymentCalculatorProps {
  debts: Debt[];
}

export default function PaymentCalculator({ debts }: PaymentCalculatorProps) {
  const [strategy, setStrategy] = useState<PaymentStrategy>('SNOWBALL');
  const [extraPayment, setExtraPayment] = useState(0);

  const calculatePayoffPlan = () => {
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'SNOWBALL') {
        return a.remainingAmount - b.remainingAmount;
      }
      return b.interestRate - a.interestRate;
    });

    return sortedDebts.map((debt) => {
      const monthsToPayoff = Math.ceil(
        debt.remainingAmount /
          (debt.minimumPayment + (extraPayment / sortedDebts.length))
      );
      const totalInterest =
        (debt.remainingAmount * (debt.interestRate / 100) * monthsToPayoff) / 12;

      return {
        ...debt,
        monthsToPayoff,
        totalInterest,
      };
    });
  };

  const payoffPlan = calculatePayoffPlan();
  const totalMonths = Math.max(...payoffPlan.map((d) => d.monthsToPayoff));
  const totalInterest = payoffPlan.reduce((sum, d) => sum + d.totalInterest, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold">Payment Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Strategy
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as PaymentStrategy)}
          >
            <option value="SNOWBALL">Debt Snowball (Smallest Balance First)</option>
            <option value="AVALANCHE">Debt Avalanche (Highest Interest First)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extra Monthly Payment
          </label>
          <input
            type="number"
            min="0"
            step="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={extraPayment}
            onChange={(e) => setExtraPayment(Number(e.target.value))}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Payoff Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalMonths} months
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${totalInterest.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {payoffPlan.map((debt) => (
              <div
                key={debt.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{debt.title}</h3>
                    <p className="text-sm text-gray-500">
                      {debt.category.replace('_', ' ')}
                    </p>
                  </div>
                  <TrendingDown className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Months to Payoff</p>
                    <p className="font-medium">{debt.monthsToPayoff}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Interest</p>
                    <p className="font-medium">${debt.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}