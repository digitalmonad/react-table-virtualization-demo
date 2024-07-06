export type Transaction = {
  id: string;
  creditCardNumber: string;
  amount: number;
  currency: string;
  createdAt: string;
};

export type GroupedTransactions = {
  transactions: Transaction[];
  totalAmount: number;
  createdAt: string;
  count: number;
};

export type ProcessedTransaction = Transaction & {
  isAggregation?: boolean;
  count?: number;
};
