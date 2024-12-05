import React, { useState } from 'react';
import { usePaymentPeriod } from '../../context/PaymentPeriodContext';
import { Clock, Plus, Edit2, Trash2, X } from 'lucide-react';
import { PaymentPeriodType } from '../../types';

interface PeriodFormData {
  months: number;
  label: string;
}

export default function PaymentPeriodSettings() {
  const { state, addPeriod, updatePeriod, deletePeriod } = usePaymentPeriod();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PeriodFormData>({
    months: 1,
    label: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updatePeriod(editingId, formData);
    } else {
      addPeriod(formData);
    }
    handleCancel();
  };

  const handleEdit = (period: PaymentPeriodType) => {
    setFormData({ months: period.months, label: period.label });
    setEditingId(period.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ months: 1, label: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个还款周期吗？')) {
      deletePeriod(id);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">还款周期设置</h3>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            添加周期
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  月数
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.months}
                  onChange={(e) =>
                    setFormData({ ...formData, months: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  显示名称
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  {editingId ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {state.periods.map((period) => (
            <div
              key={period.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{period.label}</p>
                <p className="text-sm text-gray-500">{period.months} 个月</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(period)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(period.id)}
                  className="p-2 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}