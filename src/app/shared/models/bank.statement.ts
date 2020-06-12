import { BankStatementEntry } from './bank-statement-entry';
import { FileExtension } from './file.extension';
import { Bank } from './bank';

export class BankStatement {
	
	_id: string;

	userId: string;

	periodStart: string;

	periodEnd: string;

	fileExtension: FileExtension;

	fileName: string;

	originalFileName: string;

	columnDate: string;

	columnDescription: string;

	columnValue: string;

	columnBalance: string;

	entries: BankStatementEntry[ ];

	preSignedURL: string;
	
	bank: Bank;

	uploadedAt: string;

	status: string;

}