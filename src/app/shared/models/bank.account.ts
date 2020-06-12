import { Bank } from './bank';

export class BankAccount {
	
    accountNumber: string;

    agency: string;

    bank: Bank;

    accountType: string;

    balance: number;

    constructor(bank: string, accountNumber: string, agency: string, accountType: string, balance: number){
        this.accountType = accountType;    
        this.agency = agency;    
        this.accountNumber = accountNumber;    
        this.bank = bank === 'inter'? Bank.INTER: bank === 'caixa'? Bank.CAIXA : Bank.ITAU;    
        this.balance = balance;    
    }
	
}
