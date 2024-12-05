import React from 'react';
import { PaymentPlan } from '../../types';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentScheduleProps {
  plans: PaymentPlan[];
  onComplete?: (planId: string) => void;
}

export default function PaymentSchedule({ plans, onComplete }: PaymentScheduleProps) {
  const today = new Date();
  const upcomingPayments = plans
    .filter(plan => plan.status === 'PENDING')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const overduePayments = plans.filter(plan => 
    plan.status === 'PENDING' && new Date(plan.date) < today
  );

  return (
    <div className="space-y-6">
      {overduePayments.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-red-500">逾期还款</h3>
          </div>
          <div className="space-y-3">
            {overduePayments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">¥{payment.amount}</p>
                    <p className="text-sm text-red-600">应还日期 {new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {onComplete && (
                  <button
                    onClick={() => onComplete(payment.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    标记已还
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-medium">即将到期</h3>
        </div>
        <div className="space-y-3">
          {upcomingPayments.map(payment => (
            <div key={payment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">¥{payment.amount}</p>
                  <p className="text-sm text-gray-500">到期日 {new Date(payment.date).toLocaleDateString()}</p>
                </div>
              </div>
              {payment.status === 'COMPLETED' ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm">已还清</span>
                </div>
              ) : onComplete && (
                <button
                  onClick={() => onComplete(payment.id)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  标记已还
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}