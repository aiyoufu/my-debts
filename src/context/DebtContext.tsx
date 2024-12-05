import React, { createContext, useContext, useReducer } from 'react';
import { Debt, DebtFormData } from '../types';

interface DebtState {
  debts: Debt[];
  loading: boolean;
  error: string | null;
}

type DebtAction =
  | { type: 'ADD_DEBT'; payload: Debt }
  | { type: 'UPDATE_DEBT'; payload: Debt }
  | { type: 'DELETE_DEBT'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: DebtState = {
  debts: [],
  loading: false,
  error: null,
};

const DebtContext = createContext<{
  state: DebtState;
  dispatch: React.Dispatch<DebtAction>;
  addDebt: (data: DebtFormData) => void;
  updateDebt: (id: string, data: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addDebt: () => null,
  updateDebt: () => null,
  deleteDebt: () => null,
});

function debtReducer(state: DebtState, action: DebtAction): DebtState {
  switch (action.type) {
    case 'ADD_DEBT':
      return {
        ...state,
        debts: [...state.debts, action.payload],
      };
    case 'UPDATE_DEBT':
      return {
        ...state,
        debts: state.debts.map((debt) =>
          debt.id === action.payload.id ? action.payload : debt
        ),
      };
    case 'DELETE_DEBT':
      return {
        ...state,
        debts: state.debts.filter((debt) => debt.id !== action.payload),
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

export function DebtProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(debtReducer, initialState);

  const addDebt = (data: DebtFormData) => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      ...data,
      remainingAmount: data.amount,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_DEBT', payload: newDebt });
  };

  const updateDebt = (id: string, data: Partial<Debt>) => {
    const existingDebt = state.debts.find((debt) => debt.id === id);
    if (!existingDebt) {
      dispatch({ type: 'SET_ERROR', payload: 'Debt not found' });
      return;
    }
    dispatch({
      type: 'UPDATE_DEBT',
      payload: { ...existingDebt, ...data },
    });
  };

  const deleteDebt = (id: string) => {
    dispatch({ type: 'DELETE_DEBT', payload: id });
  };

  return (
    <DebtContext.Provider
      value={{ state, dispatch, addDebt, updateDebt, deleteDebt }}
    >
      {children}
    </DebtContext.Provider>
  );
}

export const useDebt = () => useContext(DebtContext);