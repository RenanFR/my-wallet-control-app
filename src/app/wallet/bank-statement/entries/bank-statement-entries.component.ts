import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { BankStatement } from '../../../shared/models/bank.statement';
import { ExpenseCategory } from '../../../shared/models/expense-category';
import { ExpenseCategoryService } from '../../expense-category/service/expense-category.service';
import { BankStatementService } from '../service/bank-statement.service';

@Component({
  templateUrl: './bank-statement-entries.component.html'
})
export class BankStatementEntriesComponent implements OnInit {

  bankStatement: BankStatement = new BankStatement();
  expenseCategories: ExpenseCategory[] = [];
  page = 1;
  pageSize = 10;

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
