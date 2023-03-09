export function simulateMonths(baseMonth: string, numMonths: number): string[] {
  const result: string[] = [];
  let currentDate = new Date(`${baseMonth}-01T00:00:00`);

  for (let i = 0; i < numMonths; i++) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    result.push(currentDate.toISOString().slice(0, 7));
  }

  return result;
}

type Transaction = { id: number, label: string, amount: number };

export function sumTransactions(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}
