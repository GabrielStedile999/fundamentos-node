import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

const getIncomes = (totalValue: number, transaction: Transaction): number => {
  let total = totalValue;
  if (transaction.type === 'income') {
    total += transaction.value;
  }
  return total;
};

const getOutcomes = (totalValue: number, transaction: Transaction): number => {
  let total = totalValue;
  if (transaction.type === 'outcome') {
    total += transaction.value;
  }
  return total;
};

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(getIncomes, 0);
    const outcome = this.transactions.reduce(getOutcomes, 0);
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
