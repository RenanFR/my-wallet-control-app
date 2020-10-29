import { Component, OnInit } from '@angular/core';
import { BankStatementService } from '../service/bank-statement.service';
import { BankStatement } from '../../../shared/models/bank.statement';
import { ActivatedRoute } from '@angular/router';
import { ExpenseCategory } from '../../../shared/models/expense-category';
import { ExpenseCategoryService } from '../../expense-category/service/expense-category.service';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: './bank-statement-entries.component.html'
})
export class BankStatementEntriesComponent implements OnInit {

  bankStatement: BankStatement = new BankStatement();
  expenseCategories: ExpenseCategory[ ] = [ ];
  page = 1;
  pageSize = 20;

  constructor(
    private route: ActivatedRoute,
    private bankStatementEntriesService: BankStatementService,
    private expenseCategoryService: ExpenseCategoryService
  ) { }

  ngOnInit(): void {
    let uploadId = this.route.snapshot.params.objectId;
    this.bankStatementEntriesService
        .getByUpload(uploadId)
        .pipe(flatMap((response: BankStatement) => {
          this.bankStatement = response;
          return this.expenseCategoryService.getByAccount();
        }))
        .subscribe(response => {
          this.expenseCategories = response;
        });
  }

}
