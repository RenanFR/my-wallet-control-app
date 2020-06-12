import { Component, OnDestroy, OnInit } from '@angular/core';
import { BankStatementProcessingStatus } from '../../../shared/models/bank-statement-processing-status';
import { BankStatement } from '../../../shared/models/bank.statement';
import { TokenService } from '../../../shared/service/token.service';
import { BankStatementService } from '../service/bank-statement.service';
import { WebSocketAPI } from './websocket-api';

@Component({
  templateUrl: './bank-statement-list.component.html'
})
export class BankStatementListComponent implements OnInit, OnDestroy {

  bankStatements: BankStatement[];
  webSocketAPI: WebSocketAPI;

  constructor(
    private tokenService: TokenService,
    private bankStatementEntriesService: BankStatementService
  ) { }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(this);
    this.bankStatementEntriesService
        .getByAccount()
        .subscribe(response => {
          this.bankStatements = response;
          this.connect(this.tokenService.getUserId());
        });
  }

  ngOnDestroy(): void {
    this.webSocketAPI.disconnect();
  }  

  changeStatus(bankStatementProcessingStatus: BankStatementProcessingStatus): void {
    this.bankStatements
      .filter(b => b._id === bankStatementProcessingStatus.statementId)
      .forEach(b => b.status = bankStatementProcessingStatus.status);
  }    

  private connect(account: string): void {
    this.webSocketAPI.connect(account);
  }  

  getProcessingStatus(status: string): string {
    if (status === 'FAILED') {
      return 'FALHA NO PROCESSAMENTO';
    } else if (status === 'SUCCEEDED') {
      return 'PROCESSADO COM SUCESSO';
    } else {
      return 'PROCESSAMENTO EM ANDAMENTO';
    }
  }  

}
