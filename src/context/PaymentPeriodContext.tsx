import React, { createContext, useContext, useReducer } from 'react';
import { PaymentPeriodType } from '../types';

interface PaymentPeriodState {
  periods: PaymentPeriodType[];
}

type PaymentPeriodAction =
  | { type: 'ADD_PERIOD'; payload: PaymentPeriodType }
  | { type: 'UPDATE_PERIOD'; payload: PaymentPeriodType }
  | { type: 'DELETE_PERIOD'; payload: string };

const initialPeriods: PaymentPeriodType[] = [
  { id: '1', months: 1, label: '每月' },
  { id: '3', months: 3, label: '每3个月' },
  { id: '6', months: 6, label: '每6个月' },
  { id: '12', months: 12, label: '每年' },
];

const initialState: PaymentPeriodState = {
  periods: initialPeriods,
};

const PaymentPeriodContext = createContext<{
  state: PaymentPeriodState;
  addPeriod: (period: Omit<PaymentPeriodType, 'id'>) => void;
  updatePeriod: (id: string, period: Partial<PaymentPeriodType>) => void;
  deletePeriod: (id: string) => void;
}>({
  state: initialState,
  addPeriod: () => null,
  updatePeriod: () => null,
  deletePeriod: () => null,
});

function paymentPeriodReducer(
  state: PaymentPeriodState,
  action: PaymentPeriodAction
): PaymentPeriodState {
  switch (action.type) {
    case 'ADD_PERIOD':
      return {
        ...state,
        periods: [...state.periods, action.payload],
      };
    case 'UPDATE_PERIOD':
      return {
        ...state,
        periods: state.periods.map((period) =>
          period.id === action.payload.id ? action.payload : period
        ),
      };
    case 'DELETE_PERIOD':
      return {
        ...state,
        periods: state.periods.filter((period) => period.id !== action.payload),
      };
    default:
      return state;
  }
}

export function PaymentPeriodProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(paymentPeriodReducer, initialState);

  const addPeriod = (period: Omit<PaymentPeriodType, 'id'>) => {
    const newPeriod: PaymentPeriodType = {
      ...period,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_PERIOD', payload: newPeriod });
  };

  const updatePeriod = (id: string, period: Partial<PaymentPeriodType>) => {
    const existingPeriod = state.periods.find((p) => p.id === id);
    if (existingPeriod) {
      dispatch({
        type: 'UPDATE_PERIOD',
        payload: { ...existingPeriod, ...period },
      });
    }
  };

  const deletePeriod = (id: string) => {
    dispatch({ type: 'DELETE_PERIOD', payload: id });
  };

  return (
    <PaymentPeriodContext.Provider
      value={{ state, addPeriod, updatePeriod, deletePeriod }}
    >
      {children}
    </PaymentPeriodContext.Provider>
  );
}

export const usePaymentPeriod = () => useContext(PaymentPeriodContext);