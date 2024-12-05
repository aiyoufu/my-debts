import React from 'react';
import { Debt } from '../../types';
import { DollarSign, TrendingDown, Calendar } from 'lucide-react';

interface PaymentSummaryProps {
  debts: Debt[];
}

export default function PaymentSummary({ debts }: PaymentSummaryProps) {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const averageInterest = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length;
  
  const nextPaymentDate = debts
    .map(debt => new Date(debt.dueDate))
    .sort((a, b) => a.getTime() - b.getTime())[0];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">还款概览</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">总债务</p>
              <p className="text-lg font-semibold">¥{totalDebt.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">月还款额</p>
              <p className="text-lg font-semibold">¥{totalMinPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingDown className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">平均利率</p>
              <p className="text-lg font-semibold">{averageInterest.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">下次还款</p>
              <p className="text-lg font-semibold">
                {nextPaymentDate?.toLocaleDateString() || '暂无待还'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}