export default function generateTransactions(numTransactions: number): { date: string, label: string, amount: number }[] {
    const transactions = [];
    const expenseLabels = ["Achat jeu vidéo", "Facture d'électricité", "Courses alimentaires", "Remboursement d'emprunt", "Abonnement Netflix"];
    const incomeLabels = ["Salaire", "Virement"];
    const today = new Date();
  
    for (let i = 0; i < numTransactions; i++) {
      const randomLabel = i % 2 === 0 ? expenseLabels[Math.floor(Math.random() * expenseLabels.length)] : incomeLabels[Math.floor(Math.random() * incomeLabels.length)];
      const randomAmount = i % 2 === 0 ? Math.round(Math.random() * 1000) / -100 : Math.round(Math.random() * 1000) / 100;
      const randomDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const transaction = { date: randomDate.toISOString().split('T')[0], label: randomLabel, amount: randomAmount };
      transactions.push(transaction);
    }
  
    return transactions;
  }
  