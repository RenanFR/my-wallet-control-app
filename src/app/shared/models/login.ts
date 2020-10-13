import { BankAccount } from './bank.account';

export class Login {
	
    _id: string;

    userEmail: string;

    userName: string;

    password: string;

    passwordConfirm: string;

    cpf: string;

    bankAccounts: BankAccount[] = [];

}
