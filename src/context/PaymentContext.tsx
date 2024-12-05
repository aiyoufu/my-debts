import React, { createContext, useContext, useReducer } from 'react';
import { PaymentPlan, PaymentStrategy, Debt } from '../types';
import { mockPaymentPlans } from '../data/mockData';

interface PaymentState {
  plans: PaymentPlan[];
  loading: boolean;
  error: string | null;
}

type PaymentAction =
  | { type: 'GENERATE_PLANS'; payload: PaymentPlan[] }
  | { type: 'COMPLETE_PAYMENT'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: PaymentState = {
  plans: mockPaymentPlans,
  loading: false,
  error: null,
};

const PaymentContext = createContext<{
  state: PaymentState;
  dispatch: React.Dispatch<PaymentAction>;
  generatePaymentPlans: (
    debts: Debt[],
    strategy: PaymentStrategy,
    extraPayment: number
  ) => void;
  completePayment: (planId: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  generatePaymentPlans: () => null,
  completePayment: () => null,
});

function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case 'GENERATE_PLANS':
      return {
        ...state,
        plans: action.payload,
        error: null,
      };
    case 'COMPLETE_PAYMENT':
      return {
        ...state,
        plans: state.plans.map((plan) =>
          plan.id === action.payload
            ? { ...plan, status: 'COMPLETED' }
            : plan
        ),
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const generatePaymentPlans = (
    debts: Debt[],
    strategy: PaymentStrategy,
    extraPayment: number
  ) => {
    try {
      const sortedDebts = [...debts].sort((a, b) => {
        if (strategy === 'SNOWBALL') {
          return a.remainingAmount - b.remainingAmount;
        }
        return b.interestRate - a.interestRate;
      });

      const plans: PaymentPlan[] = [];
      let currentDate = new Date();

      sortedDebts.forEach((debt) => {
        const monthlyPayment = debt.minimumPayment + (extraPayment / sortedDebts.length);
        const months = Math.ceil(debt.remainingAmount / monthlyPayment);

        for (let i = 0; i < months; i++) {
          const paymentDate = new Date(currentDate);
          paymentDate.setMonth(paymentDate.getMonth() + i);

          plans.push({
            id: crypto.randomUUID(),
            debtId: debt.id,
            amount: monthlyPayment,
            date: paymentDate.toISOString(),
            status: 'PENDING',
          });
        }
      });

      dispatch({ type: 'GENERATE_PLANS', payload: plans });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to generate payment plans',
      });
    }
  };

  const completePayment = (planId: string) => {
    dispatch({ type: 'COMPLETE_PAYMENT', payload: planId });
  };

  return (
    <PaymentContext.Provider
      value={{ state, dispatch, generatePaymentPlans, completePayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);