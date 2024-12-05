import React, { createContext, useContext, useReducer } from 'react';
import { DebtCategory } from '../types';

interface DebtCategoryState {
  categories: DebtCategory[];
  loading: boolean;
  error: string | null;
}

type DebtCategoryAction =
  | { type: 'ADD_CATEGORY'; payload: DebtCategory }
  | { type: 'UPDATE_CATEGORY'; payload: DebtCategory }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialCategories: DebtCategory[] = [
  { id: '1', name: '信用卡', description: '信用卡债务', icon: 'credit-card' },
  { id: '2', name: '房贷', description: '房屋贷款', icon: 'home' },
  { id: '3', name: '车贷', description: '汽车贷款', icon: 'car' },
  { id: '4', name: '其他', description: '其他类型债务', icon: 'wallet' },
];

const initialState: DebtCategoryState = {
  categories: initialCategories,
  loading: false,
  error: null,
};

const DebtCategoryContext = createContext<{
  state: DebtCategoryState;
  addCategory: (category: Omit<DebtCategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<DebtCategory>) => void;
  deleteCategory: (id: string) => void;
}>({
  state: initialState,
  addCategory: () => null,
  updateCategory: () => null,
  deleteCategory: () => null,
});

function debtCategoryReducer(
  state: DebtCategoryState,
  action: DebtCategoryAction
): DebtCategoryState {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
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

export function DebtCategoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(debtCategoryReducer, initialState);

  const addCategory = (category: Omit<DebtCategory, 'id'>) => {
    const newCategory: DebtCategory = {
      ...category,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const updateCategory = (id: string, category: Partial<DebtCategory>) => {
    const existingCategory = state.categories.find((c) => c.id === id);
    if (existingCategory) {
      dispatch({
        type: 'UPDATE_CATEGORY',
        payload: { ...existingCategory, ...category },
      });
    }
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  return (
    <DebtCategoryContext.Provider
      value={{ state, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </DebtCategoryContext.Provider>
  );
}

export const useDebtCategory = () => useContext(DebtCategoryContext);