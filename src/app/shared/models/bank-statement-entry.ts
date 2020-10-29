import { ExpenseCategory } from './expense-category';

export class BankStatementEntry {
	
    date: string;

    description: string;

    value: number;

    balanceAfter: number;

    lineNumber: number;

    category: ExpenseCategory = new ExpenseCategory();
	
}
