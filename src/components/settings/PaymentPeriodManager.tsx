import React, { useState } from 'react';
import { usePaymentPeriod } from '../../context/PaymentPeriodContext';
import { Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface PeriodFormData {
  months: number;
  label: string;
}

export default function PaymentPeriodManager() {
  const { state, addPeriod, updatePeriod, deletePeriod } = usePaymentPeriod();
  const [isOpen, setIsOpen] = useState(false);
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
    handleClose();
  };

  const handleEdit = (period: { id: string; months: number; label: string }) => {
    setFormData({ months: period.months, label: period.label });
    setEditingId(period.id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ months: 1, label: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个还款周期吗？')) {
      deletePeriod(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-medium">分期类型管理</h2>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            添加类型
          </button>
        </div>

        <div className="space-y-3">
          {state.periods.map((period) => (
            <div
              key={period.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{period.label}</h3>
                <p className="text-sm text-gray-500">{period.months} 个月</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(period)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(period.id)}
                  className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={isOpen}
          onClose={handleClose}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <Dialog.Title className="text-lg font-medium mb-4">
                {editingId ? '编辑分期类型' : '添加分期类型'}
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    月数
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    {editingId ? '保存' : '添加'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}