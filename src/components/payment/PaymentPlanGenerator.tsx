import React, { useState } from 'react';
import { Debt, PaymentStrategy } from '../../types';
import { Calculator, X } from 'lucide-react';

interface PaymentPlanGeneratorProps {
  debts: Debt[];
  onGenerate: (strategy: PaymentStrategy, extraPayment: number) => void;
  onCancel: () => void;
}

export default function PaymentPlanGenerator({ debts, onGenerate, onCancel }: PaymentPlanGeneratorProps) {
  const [strategy, setStrategy] = useState<PaymentStrategy>('SNOWBALL');
  const [extraPayment, setExtraPayment] = useState(0);

  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(strategy, extraPayment);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold">创建还款计划</h2>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            还款策略
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as PaymentStrategy)}
          >
            <option value="SNOWBALL">雪球策略 - 优先还小额债务</option>
            <option value="AVALANCHE">雪崩策略 - 优先还高利率债务</option>
          </select>
          <p className="mt-2 text-sm text-gray-500">
            {strategy === 'SNOWBALL'
              ? '通过优先偿还小额债务来建立还款动力'
              : '通过优先偿还高利率债务来节省利息支出'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            每月额外还款
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">¥</span>
            </div>
            <input
              type="number"
              min="0"
              step="10"
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            当前最低还款总额: ¥{totalMinPayment.toFixed(2)}/月
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">
            每月总还款额
          </h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            ¥{(totalMinPayment + extraPayment).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            生成计划
          </button>
        </div>
      </form>
    </div>
  );
}