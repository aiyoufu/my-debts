import React, { useState } from 'react';
import { Debt } from '../types';
import { CreditCard, Car, GraduationCap, Home, Wallet, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useDebt } from '../context/DebtContext';
import { useDebtCategory } from '../context/DebtCategoryContext';
import EditDebtForm from './debt/EditDebtForm';

interface DebtCardProps {
  debt: Debt;
}

export default function DebtCard({ debt }: DebtCardProps) {
  const { updateDebt, deleteDebt } = useDebt();
  const { state: categoryState } = useDebtCategory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const category = categoryState.categories.find(c => c.id === debt.categoryId);

  const getCategoryIcon = () => {
    if (!category) return <Wallet className="h-6 w-6" />;
    
    switch (category.icon) {
      case 'credit-card':
        return <CreditCard className="h-6 w-6" />;
      case 'car':
        return <Car className="h-6 w-6" />;
      case 'graduation-cap':
        return <GraduationCap className="h-6 w-6" />;
      case 'home':
        return <Home className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  const progress = ((debt.amount - debt.remainingAmount) / debt.amount) * 100;

  const handleEdit = (id: string, data: Partial<Debt>) => {
    updateDebt(id, data);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这项债务吗？')) {
      deleteDebt(debt.id);
    }
  };

  if (showEditForm) {
    return (
      <EditDebtForm
        debt={debt}
        onSubmit={handleEdit}
        onCancel={() => setShowEditForm(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            {getCategoryIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{debt.title}</h3>
            <p className="text-sm text-gray-500">
              {category?.name || '未分类'} · {debt.type === 'ONE_TIME' ? '一次性还款' : '分期还款'}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowActions(false);
                    setShowEditForm(true);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  编辑
                </button>
                <button
                  onClick={() => {
                    setShowActions(false);
                    handleDelete();
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  删除
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">进度</span>
          <span className="text-gray-900 font-medium">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">总金额</p>
          <p className="font-medium text-gray-900">¥{debt.amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">剩余金额</p>
          <p className="font-medium text-gray-900">¥{debt.remainingAmount.toLocaleString()}</p>
        </div>
        {debt.type === 'PERIODIC' && (
          <>
            <div>
              <p className="text-gray-500">每期还款额</p>
              <p className="font-medium text-gray-900">¥{debt.paymentAmount?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">还款日</p>
              <p className="font-medium text-gray-900">每月{debt.paymentDay}日</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}