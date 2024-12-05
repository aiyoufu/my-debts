import { Debt, PaymentPlan } from '../types';

export const mockDebts: Debt[] = [
  {
    id: '1',
    title: 'Credit Card A',
    amount: 5000,
    remainingAmount: 4200,
    interestRate: 15.99,
    minimumPayment: 150,
    category: 'CREDIT_CARD',
    dueDate: '2024-04-15',
    createdAt: '2023-12-01',
  },
  {
    id: '2',
    title: 'Student Loan',
    amount: 25000,
    remainingAmount: 22000,
    interestRate: 4.5,
    minimumPayment: 300,
    category: 'STUDENT_LOAN',
    dueDate: '2024-04-20',
    createdAt: '2023-11-15',
  },
  {
    id: '3',
    title: 'Car Loan',
    amount: 15000,
    remainingAmount: 12000,
    interestRate: 6.5,
    minimumPayment: 250,
    category: 'CAR_LOAN',
    dueDate: '2024-04-10',
    createdAt: '2023-10-01',
  },
];

export const mockPaymentPlans: PaymentPlan[] = [
  {
    id: '1',
    debtId: '1',
    amount: 150,
    date: '2024-04-15',
    status: 'PENDING',
  },
  {
    id: '2',
    debtId: '2',
    amount: 300,
    date: '2024-04-20',
    status: 'PENDING',
  },
  {
    id: '3',
    debtId: '3',
    amount: 250,
    date: '2024-04-10',
    status: 'PENDING',
  },
];