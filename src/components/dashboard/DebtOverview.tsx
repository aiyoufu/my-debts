import React from 'react';
import { DollarSign, Calendar, Clock } from 'lucide-react';
import { Debt } from '../../types';
import ScrollingDebts from './ScrollingDebts';

interface DebtOverviewProps {
  totalDebt: number;
  currentMonthPayment: number;
  nextMonthPayment: number;
  nearlyCompletedDebts: Debt[];
}

export default function DebtOverview({ 
  totalDebt, 
  currentMonthPayment, 
  nextMonthPayment,
  nearlyCompletedDebts
}: DebtOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">还款概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <p className="text-sm text-gray-500">本月应还</p>
              <p className="text-lg font-semibold">¥{currentMonthPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">下月应还</p>
              <p className="text-lg font-semibold">¥{nextMonthPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-3">即将还完的负债</p>
            <ScrollingDebts debts={nearlyCompletedDebts} />
          </div>
        </div>
      </div>
    </div>
  );
}