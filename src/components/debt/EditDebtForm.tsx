import React from 'react';
import { Debt } from '../../types';
import DebtForm from './DebtForm';

interface EditDebtFormProps {
  debt: Debt;
  onSubmit: (id: string, data: Partial<Debt>) => void;
  onCancel: () => void;
}

export default function EditDebtForm({ debt, onSubmit, onCancel }: EditDebtFormProps) {
  const handleSubmit = (data: Partial<Debt>) => {
    onSubmit(debt.id, data);
  };

  return (
    <DebtForm
      initialData={debt}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isEdit={true}
    />
  );
}