import React from 'react';
import { Calendar } from 'lucide-react';
import { Payment } from '../../types';

interface MonthlyPaymentsProps {
  payments: Payment[];
  title: string;
}

export default function MonthlyPayments({ payments, title }: MonthlyPaymentsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {payments.length > 0 ? (
        <div className="space-y-4">
          {payments
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .map((payment) => (
              <div key={payment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.title}</p>
                    <p className="text-sm text-gray-500">
                      {payment.type === 'ONE_TIME' ? '一次性还款' : '分期还款'}
                      {' · '}
                      {new Date(payment.dueDate).getDate()}日到期
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ¥{payment.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {payment.type === 'ONE_TIME' ? '应还金额' : '本期应还'}
                  </p>
                </div>
              </div>
            ))}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">总计</p>
              <p className="text-xl font-bold text-gray-900">
                ¥{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无待还款项</h3>
        </div>
      )}
    </div>
  );
}