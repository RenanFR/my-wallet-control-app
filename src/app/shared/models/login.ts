import { BankAccount } from './bank.account';

export class Login {
	
    id: string;

    userEmail: string;

    userName: string;

    password: string;

    passwordConfirm: string;

    bitcoinBalance: number;

    cpf: string;

    easynvestPassword: string;

    bankAccounts: BankAccount[] = [];

}
