export interface User {
  id: string;
  name: string;
  email: string;
}

export type DebtType = 'ONE_TIME' | 'PERIODIC';

export interface DebtCategory {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

export interface PaymentPeriodType {
  id: string;
  months: number;
  label: string;
}

export interface Debt {
  id: string;
  title: string;
  amount: number;
  remainingAmount: number;
  categoryId: string;
  type: DebtType;
  paymentPeriod?: string;
  paymentDay?: number;
  paymentAmount?: number;
  dueDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  categoryId: string;
  type: DebtType;
}

export interface DebtFormData {
  title: string;
  amount: number;
  remainingAmount?: number;
  categoryId: string;
  type: DebtType;
  paymentPeriod?: string;
  paymentDay?: number;
  paymentAmount?: number;
  dueDate: string;
  endDate?: string;
}

export interface PaymentPlan {
  id: string;
  debtId: string;
  amount: number;
  date: string;
  status: 'PENDING' | 'COMPLETED';
}

export type PaymentStrategy = 'SNOWBALL' | 'AVALANCHE';