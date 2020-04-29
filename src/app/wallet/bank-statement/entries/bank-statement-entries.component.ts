import { Component, OnInit } from '@angular/core';
import { BankStatementEntriesService } from './service/bank-statement-entries.service';
import { BankStatement } from '../../../shared/models/bank.statement';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './bank-statement-entries.component.html'
})
export class BankStatementEntriesComponent implements OnInit {

  bankStatement: BankStatement;

  constructor(
    private route: ActivatedRoute,
    private bankStatementEntriesService: BankStatementEntriesService
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
