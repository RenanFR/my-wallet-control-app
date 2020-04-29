import { Component, OnInit } from '@angular/core';
import { BankStatementEntriesService } from '../bank-statement/entries/service/bank-statement-entries.service';
import { ActivatedRoute } from '@angular/router';
import { BankStatement } from '../../shared/models/bank.statement';

@Component({
  templateUrl: './bank-statement-list.component.html'
})
export class BankStatementListComponent implements OnInit {

  bankStatements: BankStatement[];

  constructor(
    private route: ActivatedRoute,
    private bankStatementEntriesService: BankStatementEntriesService
  ) { }

  ngOnInit(): void {
    let accountId = this.route.snapshot.params.account;
    this.bankStatementEntriesService
        .getByAccount(accountId)
        .subscribe(response => {
          this.bankStatements = response;
        });
  }

}
