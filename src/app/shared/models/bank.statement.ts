import { BankStatementEntry } from './bank-statement-entry';
import { FileExtension } from './file.extension';

export class BankStatement {
	
	account: string;

	periodStart: string;

	periodEnd: string;

	fileExtension: FileExtension;

	columnDate: string;

	columnDescription: string;

	columnValue: string;

	columnBalance: string;

	entries: BankStatementEntry[ ];

	preSignedURL: string;

}