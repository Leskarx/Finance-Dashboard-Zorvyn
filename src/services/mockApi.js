import { mockTransactions } from "../data/mockData";

export const fetchTransactions = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve([...mockTransactions]), 600)
  );
