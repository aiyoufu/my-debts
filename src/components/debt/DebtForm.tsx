import React, { useState } from 'react';
import { DebtType, DebtFormData, Debt } from '../../types';
import { Plus, Edit2 } from 'lucide-react';
import { useDebtCategory } from '../../context/DebtCategoryContext';
import { usePaymentPeriod } from '../../context/PaymentPeriodContext';

interface DebtFormProps {
  onSubmit: (data: DebtFormData) => void;
  onCancel: () => void;
  initialData?: Debt;
  isEdit?: boolean;
}

export default function DebtForm({ onSubmit, onCancel, initialData, isEdit = false }: DebtFormProps) {
  const { state: categoryState } = useDebtCategory();
  const { state: periodState } = usePaymentPeriod();
  
  const [formData, setFormData] = useState<DebtFormData>({
    title: initialData?.title || '',
    amount: initialData?.amount || 0,
    remainingAmount: initialData?.remainingAmount || 0,
    categoryId: initialData?.categoryId || categoryState.categories[0]?.id || '',
    type: initialData?.type || 'ONE_TIME',
    paymentPeriod: initialData?.paymentPeriod || periodState.periods[0]?.id,
    paymentDay: initialData?.paymentDay || 1,
    paymentAmount: initialData?.paymentAmount || 0,
    dueDate: initialData?.dueDate || '',
    endDate: initialData?.endDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      remainingAmount: isEdit ? formData.remainingAmount : formData.amount,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        {isEdit ? (
          <Edit2 className="h-6 w-6 text-indigo-600 mr-2" />
        ) : (
          <Plus className="h-6 w-6 text-indigo-600 mr-2" />
        )}
        <h2 className="text-xl font-semibold">{isEdit ? '编辑债务' : '添加债务'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">债务名称</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">总金额</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          />
        </div>

        {isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700">剩余金额</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.remainingAmount}
              onChange={(e) => setFormData({ ...formData, remainingAmount: Number(e.target.value) })}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">还款类型</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.type}
            onChange={(e) => {
              const type = e.target.value as DebtType;
              setFormData({
                ...formData,
                type,
                paymentPeriod: type === 'PERIODIC' ? periodState.periods[0]?.id : undefined,
                paymentDay: type === 'PERIODIC' ? 1 : undefined,
              });
            }}
          >
            <option value="ONE_TIME">一次性还款</option>
            <option value="PERIODIC">分期还款</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">债务类别</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: e.target.value,
              })
            }
          >
            {categoryState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {formData.type === 'PERIODIC' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">还款周期</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.paymentPeriod}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentPeriod: e.target.value,
                  })
                }
              >
                {periodState.periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">每期还款金额</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.paymentAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentAmount: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">每月还款日</label>
              <input
                type="number"
                required
                min="1"
                max="31"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.paymentDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDay: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">结束日期</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </>
        )}

        {formData.type === 'ONE_TIME' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">到期日</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
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
            {isEdit ? '保存' : '添加'}
          </button>
        </div>
      </form>
    </div>
  );
}