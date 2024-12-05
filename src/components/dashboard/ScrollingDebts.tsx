import React, { useEffect, useState, useCallback } from 'react';
import { Debt } from '../../types';
import { Timer, Clock } from 'lucide-react';

interface ScrollingDebtsProps {
  debts: Debt[];
}

export default function ScrollingDebts({ debts }: ScrollingDebtsProps) {
  const [visibleDebts, setVisibleDebts] = useState<Debt[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const rotateArray = useCallback((arr: Debt[]) => {
    const newArr = [...arr];
    const first = newArr.shift();
    if (first) {
      newArr.push(first);
    }
    return newArr;
  }, []);

  useEffect(() => {
    if (debts.length === 0) return;
    setVisibleDebts(debts);
  }, [debts]);

  useEffect(() => {
    if (visibleDebts.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // After animation completes, rotate the array
      setTimeout(() => {
        setVisibleDebts(prev => rotateArray(prev));
        setIsAnimating(false);
      }, 600); // Slightly longer than animation duration to ensure smooth transition
    }, 3000);

    return () => clearInterval(interval);
  }, [visibleDebts, rotateArray]);

  if (debts.length === 0) {
    return <p className="text-gray-500 text-sm">暂无</p>;
  }

  const getDebtStatusColor = (debt: Debt) => {
    if (debt.type === 'ONE_TIME') {
      const dueDate = new Date(debt.dueDate);
      const today = new Date();
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue <= 7) return 'bg-red-100 text-red-800';
      if (daysUntilDue <= 15) return 'bg-orange-100 text-orange-800';
      return 'bg-yellow-100 text-yellow-800';
    } else {
      const remainingPercentage = (debt.remainingAmount / debt.amount) * 100;
      if (remainingPercentage <= 5) return 'bg-green-100 text-green-800';
      return 'bg-blue-100 text-blue-800';
    }
  };

  const getDebtIcon = (debt: Debt) => {
    if (debt.type === 'ONE_TIME') {
      return <Timer className="h-4 w-4" />;
    }
    return <Clock className="h-4 w-4" />;
  };

  const renderDebt = (debt: Debt) => (
    <div className="flex items-center space-x-2">
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDebtStatusColor(debt)}`}>
        <span className="mr-1">{getDebtIcon(debt)}</span>
        {debt.type === 'ONE_TIME' ? '一次性' : '分期'}
      </span>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">
          {debt.title}
        </p>
        <p className="text-xs text-gray-500">
          到期日: {new Date(debt.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative h-10 overflow-hidden">
      <div className="absolute w-full transition-all duration-500 ease-in-out space-y-16">
        {visibleDebts.slice(0, 2).map((debt, index) => (
          <div
            key={debt.id}
            className={`transform transition-all duration-500 ease-in-out translate-y-0`}>
            {renderDebt(debt)}
          </div>
        ))}
      </div>
    </div>
  );
}