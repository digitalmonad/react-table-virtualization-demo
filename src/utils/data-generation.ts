import { faker } from "@faker-js/faker";
import {
  Transaction,
  GroupedTransactions,
  ProcessedTransaction,
} from "./types";

export const generateData = (): Transaction[] => {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      creditCardNumber: faker.finance.creditCardNumber(),
      amount: Math.floor(Math.random() * 100),
      currency: faker.finance.currencyCode(),
      // random date in the last 30 days
      createdAt: faker.date
        .between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2020-02-01T00:00:00.000Z",
        })
        .toISOString(),
    }),
    {
      count: 10000,
    }
  );
};

export const groupAndSumDataByDate = (
  transactions: Transaction[]
): { [key: string]: GroupedTransactions } => {
  const grouped: { [key: string]: GroupedTransactions } = {};

  transactions.forEach((transaction) => {
    const normalizedDate = transaction.createdAt.split("T")[0];

    if (!grouped[normalizedDate]) {
      grouped[normalizedDate] = {
        transactions: [],
        totalAmount: 0,
        createdAt: normalizedDate,
        count: 0,
      };
    }

    grouped[normalizedDate].transactions.push(transaction);
    grouped[normalizedDate].totalAmount += transaction.amount;
    grouped[normalizedDate].count += 1;
  });

  return grouped;
};

export const flatten = (groupedTransactions: {
  [key: string]: GroupedTransactions;
}): ProcessedTransaction[] => {
  const flattened: ProcessedTransaction[] = [];

  Object.keys(groupedTransactions).forEach((key) => {
    const group = groupedTransactions[key];
    flattened.push({
      id: "",
      creditCardNumber: "",
      amount: group.totalAmount,
      currency: "",
      createdAt: group.createdAt,
      isAggregation: true,
      count: group.count,
    });

    flattened.push(...group.transactions);
  });

  return flattened;
};
