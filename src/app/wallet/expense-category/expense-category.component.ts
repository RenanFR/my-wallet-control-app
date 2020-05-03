import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseCategory } from '../../shared/models/expense-category';
import { ExpenseCategoryService } from './service/expense-category.service';

@Component({
  templateUrl: './expense-category.component.html'
})
export class ExpenseCategoryComponent implements OnInit {

  accountId: string;
  accountCategories: ExpenseCategory[];
  categoriesToSee: ExpenseCategory[];
  detailingCategory: ExpenseCategory;

  constructor(
    private route: ActivatedRoute,
    private expenseCategoryService: ExpenseCategoryService
  ) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params.account;    
    this.detailingCategory = null;
    this.expenseCategoryService
        .getByAccount(this.accountId)
        .subscribe(response => {
          this.accountCategories = response;
          this.categoriesToSee = this.accountCategories.filter(cat => cat.level === 1);
        });    
  }

  hasChildrenCategories(category: ExpenseCategory): boolean {
    return category.childrenCategories !== null && category.childrenCategories.length > 0;
  }    

  changeLevel(category: ExpenseCategory): void {
    this.categoriesToSee = category.childrenCategories;
    this.detailingCategory = category;
  }    
  
  returnRootLevel(): void {
    this.detailingCategory = null;
    this.categoriesToSee = this.accountCategories.filter(cat => cat.level === 1);
  } 

  findParentCategoryOf(category: ExpenseCategory): void {
    this.expenseCategoryService
        .getParentCategory(category)
        .subscribe(response => {
          this.detailingCategory = response;
          if (response === null) {
            this.returnRootLevel();
          } else {
            this.categoriesToSee = this.accountCategories.filter(cat => response.id === cat.id)[0].childrenCategories;
          }
        });
  } 

}
