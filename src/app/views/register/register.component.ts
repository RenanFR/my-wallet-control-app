import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BankAccount } from '../../shared/models/bank.account';
import { Login } from '../../shared/models/login';
import { AuthService } from '../../shared/service/auth.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
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
  @ViewChild('modalBankAccount') public modalBank: ModalDirective;

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

  addBankAccount(): void {
    this.modalBank.show()
  }

  addBank(): void {
    let bankAccount = new BankAccount(this.bank, this.accountNumber, this.agency, this.accountType, this.balance);
    console.log(bankAccount);
    this.login.bankAccounts.push(bankAccount);
    this.bank = undefined;
    this.accountNumber = undefined;
    this.agency = undefined;
    this.accountType = undefined;
    this.balance = undefined;
    this.modalBank.hide();
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
