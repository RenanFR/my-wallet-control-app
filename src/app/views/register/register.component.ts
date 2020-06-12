import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { BankAccount } from '../../shared/models/bank.account';
import { Login } from '../../shared/models/login';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isBrokerEnabled: boolean = false;
  hasBitcoin: boolean = false;
  bank: string;
  accountNumber: string;
  agency: string;
  accountType: string;
  balance: number;
  login: Login = new Login();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  enableOrDisableBroker(): void {
    this.isBrokerEnabled = !this.isBrokerEnabled;
  }

  enableOrDisableBitcoin(): void {
    this.hasBitcoin = !this.hasBitcoin;
  }

  async addBankAccount(): Promise<void> {
    const { value: bank } = await Swal.fire({
      title: 'ESCOLHA SEU BANCO',
      input: 'select',
      inputOptions: {
        inter: 'Banco Inter',
        caixa: 'Caixa Econômica Federal',
        itau: 'Banco Itaú'
      },
      inputPlaceholder: 'INDIQUE QUAL O SEU BANCO'
    });
    
    const { value: accountNumber } = await Swal.fire({
      title: 'NÚMERO DA CONTA',
      input: 'text',
      inputPlaceholder: 'DIGITE O NÚMERO DA SUA CONTA'
    });

    const { value: agency } = await Swal.fire({
      title: 'NÚMERO DA AGÊNCIA',
      input: 'text',
      inputPlaceholder: 'DIGITE O NÚMERO DA SUA AGÊNCIA'
    });

    const { value: accountType } = await Swal.fire({
      title: 'TIPO DE CONTA',
      input: 'select',
      inputOptions: {
        corrente: 'Corrente',
        poupanca: 'Poupança'
      },
      inputPlaceholder: 'INDIQUE O TIPO DE CONTA'
    });
    
    const { value: balance } = await Swal.fire({
      title: 'SALDO ATUAL',
      input: 'text',
      inputPlaceholder: 'INFORME O SALDO ATUAL'
    });    
      
    if (accountNumber) {
      this.accountNumber = accountNumber;
    }

    if (bank) {
      this.bank = bank;
    }

    if (agency) {
      this.agency = agency;
    }

    if (accountType) {
      this.accountType = accountType;
    }

    if (balance) {
      this.balance = balance;
    }

    this.addBank(bank, accountNumber, agency, accountType, balance);
  }

  private addBank(bank: string, accountNumber: string, agency: string, accountType: string, balance: number): void {
    let bankAccount = new BankAccount(bank, accountNumber, agency, accountType, balance);
    console.log(bankAccount);
    this.login.bankAccounts.push(bankAccount);
  }

  submitUser(): void {
    console.log(this.login);
    this.authService
      .registerUser(this.login)
      .subscribe(
        () => {
          Swal.fire("CONTA CRIADA!", "SEU USUÁRIO FOI REGISTRADO COM SUCESSO, JÁ PODE AUTENTICAR!", "success");
          this.router.navigate(['/login']);
        }, 
        (error) => {
          console.log(error.error.errorMessage);
          Swal.fire("ERRO!", error.error.errorMessage, "error");
        }
      );
  }

}
