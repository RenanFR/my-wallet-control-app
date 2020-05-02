import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankStatementService } from '../service/bank-statement.service';
import { ActivatedRoute } from '@angular/router';
import { BankStatement } from '../../../shared/models/bank.statement';
import { BankStatementProcessingStatus } from '../../../shared/models/bank-statement-processing-status';
import { WebSocketAPI } from './websocket-api';

@Component({
  templateUrl: './bank-statement-list.component.html'
})
export class BankStatementListComponent implements OnInit, OnDestroy {

  bankStatements: BankStatement[];
  webSocketAPI: WebSocketAPI;
  accountId: string;

  constructor(
    private route: ActivatedRoute,
    private bankStatementEntriesService: BankStatementService
  ) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params.account;
    this.webSocketAPI = new WebSocketAPI(this);
    this.bankStatementEntriesService
        .getByAccount(this.accountId)
        .subscribe(response => {
          this.bankStatements = response;
          this.connect(this.accountId);
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
