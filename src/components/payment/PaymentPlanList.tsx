import React from 'react';
import { PaymentPlan } from '../../types';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface PaymentPlanListProps {
  plans: PaymentPlan[];
  onComplete: (planId: string) => void;
}

export default function PaymentPlanList({ plans, onComplete }: PaymentPlanListProps) {
  const sortedPlans = [...plans].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                ${plan.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Due {new Date(plan.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {plan.status === 'COMPLETED' ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm">Completed</span>
              </div>
            ) : (
              <>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-1" />
                  <span className="text-sm">Pending</span>
                </div>
                <button
                  onClick={() => onComplete(plan.id)}
                  className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none"
                >
                  Mark Complete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}