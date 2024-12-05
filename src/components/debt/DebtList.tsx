import React, { useState } from 'react';
import { useDebt } from '../../context/DebtContext';
import DebtCard from '../DebtCard';
import DebtForm from './DebtForm';
import { Plus, CreditCard } from 'lucide-react';

export default function DebtList() {
  const { state, addDebt } = useDebt();
  const [showDebtForm, setShowDebtForm] = useState(false);

  const handleAddDebt = (formData: any) => {
    addDebt(formData);
    setShowDebtForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowDebtForm(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          添加债务
        </button>
      </div>

      {showDebtForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-2xl">
            <DebtForm
              onSubmit={handleAddDebt}
              onCancel={() => setShowDebtForm(false)}
            />
          </div>
        </div>
      )}

      {state.debts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.debts.map((debt) => (
            <DebtCard key={debt.id} debt={debt} />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center min-h-[calc(100vh-200px)] text-center">
          <div>
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">暂无债务</h3>
            <p className="mt-1 text-sm text-gray-500">
              点击上方按钮添加新的债务
            </p>
          </div>
        </div>
      )}
    </div>
  );
}