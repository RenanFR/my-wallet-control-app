import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
  
  @ViewChild('addNewModal') public addNewModal: ModalDirective;
  @ViewChild('newCategory') public newCategory: ElementRef<HTMLInputElement>;

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
  
  private returnRootLevel(): void {
    this.detailingCategory = null;
    this.categoriesToSee = this.accountCategories.filter(cat => cat.level === 1);
  } 

  findParentCategoryOf(category: ExpenseCategory): void {
    this.expenseCategoryService
        .getParentCategory(category, this.accountId)
        .subscribe(response => {
          this.detailingCategory = response;
          if (response === null) {
            this.returnRootLevel();
          } else {
            this.categoriesToSee = this.accountCategories.filter(cat => response.id === cat.id)[0].childrenCategories;
          }
        });
  } 

  addNew(): void {
    let parentCategory: ExpenseCategory;
    if (this.detailingCategory === null) {
      parentCategory = new ExpenseCategory();
      parentCategory.account = this.accountId;
    } else {
      parentCategory = this.detailingCategory;
    }
    this.expenseCategoryService
      .addNew(parentCategory, this.newCategory.nativeElement.value)
      .subscribe(response => {
            this.ngOnInit();
            this.addNewModal.hide();
      });    
  } 

}
