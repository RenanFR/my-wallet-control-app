import { Component, OnInit } from '@angular/core';
import { BankStatementService } from '../service/bank-statement.service';
import { BankStatement } from '../../../shared/models/bank.statement';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './bank-statement-entries.component.html'
})
export class BankStatementEntriesComponent implements OnInit {

  bankStatement: BankStatement = new BankStatement();
  page = 1;
  pageSize = 20;

  constructor(
    private route: ActivatedRoute,
    private bankStatementEntriesService: BankStatementService
  ) { }

  ngOnInit(): void {
    let uploadId = this.route.snapshot.params.objectId;
    this.bankStatementEntriesService
        .getByUpload(uploadId)
        .subscribe(response => {
          this.bankStatement = response;
        });
  }

}
