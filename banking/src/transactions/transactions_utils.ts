import Transaction from "../../types/Transaction"
import MonthlyTotal from "../../types/MonthlyTotal"
/**
 * Calcule le total des transactions pour un mois donné
 * @param transactions La liste de transactions à filtrer
 * @param year L'année pour laquelle effectuer la recherche
 * @param month Le mois pour lequel effectuer la recherche (de 1 à 12)
 * @returns Le total des transactions pour le mois donné
 */
export function totalForMonth(transactions: Transaction[], year: number, month: number): number {
return transactions
    .filter(t => new Date(t.date).getFullYear() === year && new Date(t.date).getMonth() === month - 1)
    .reduce((total, t) => total + t.amount, 0);
}

/**
 * Récupère le total des montants des transactions gagnées (montants positifs)
 * @param transactions La liste de transactions à filtrer
 * @returns Le total des montants gagnés
 */
export function totalGains(transactions: Transaction[]): number {
return transactions.filter(t => t.amount > 0).reduce((total, t) => total + t.amount, 0);
}

/**
 * Récupère le total des montants des transactions perdues (montants négatifs)
 * @param transactions La liste de transactions à filtrer
 * @returns Le total des montants perdus
 */
export function totalPertes(transactions: Transaction[]): number {
return transactions.filter(t => t.amount < 0).reduce((total, t) => total + t.amount, 0);
}


export function groupByMonth(transactions: Transaction[]): MonthlyTotal[] {
const monthlyTotals: MonthlyTotal[] = [];
const groupedTransactions = transactions.reduce((acc, transaction) => {
    const month = transaction.date.slice(0, 7);
    if (!acc[month]) {
    acc[month] = [];
    monthlyTotals.push({ month, total: 0 });
    }
    acc[month].push(transaction);
    monthlyTotals.find((mt) => mt.month === month)!.total += transaction.amount;
    return acc;
}, {} as Record<string, Transaction[]>);
return monthlyTotals;
}

export function sumByMonth(transactions: Transaction[]): MonthlyTotal[] {
const monthlyTotals: MonthlyTotal[] = groupByMonth(transactions);
monthlyTotals.forEach((mt) => (mt.total = Math.abs(mt.total)));
return monthlyTotals;
}