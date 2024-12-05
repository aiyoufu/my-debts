import React, { useState } from 'react';
import { useDebt } from '../../context/DebtContext';
import { usePayment } from '../../context/PaymentContext';
import PaymentPlanGenerator from './PaymentPlanGenerator';
import PaymentSchedule from './PaymentSchedule';
import { PaymentStrategy } from '../../types';
import { Calculator, ArrowRight, Trash2 } from 'lucide-react';

export default function PaymentPlans() {
  const { state: debtState } = useDebt();
  const { state: paymentState, generatePaymentPlans, completePayment } = usePayment();
  const [showGenerator, setShowGenerator] = useState(false);

  const handleGeneratePlan = (strategy: PaymentStrategy, extraPayment: number) => {
    generatePaymentPlans(debtState.debts, strategy, extraPayment);
    setShowGenerator(false);
  };

  const handleDeletePlan = () => {
    if (window.confirm('确定要删除当前还款计划吗？')) {
      // Clear all payment plans
      generatePaymentPlans([], 'SNOWBALL', 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">还款计划</h1>
        <button
          onClick={() => setShowGenerator(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Calculator className="h-5 w-5 mr-2" />
          创建新计划
        </button>
      </div>

      {showGenerator && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-2xl">
            <PaymentPlanGenerator
              debts={debtState.debts}
              onGenerate={handleGeneratePlan}
              onCancel={() => setShowGenerator(false)}
            />
          </div>
        </div>
      )}

      {paymentState.plans.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">当前还款计划</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {paymentState.plans[0].status === 'PENDING' ? '进行中' : '已完成'}
                </p>
              </div>
              <button
                onClick={handleDeletePlan}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <PaymentSchedule
              plans={paymentState.plans}
              onComplete={completePayment}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Calculator className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无还款计划</h3>
          <p className="mt-1 text-sm text-gray-500">
            点击上方按钮创建新的还款计划
          </p>
        </div>
      )}
    </div>
  );
}