import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ExpenseCategory } from '../../shared/models/expense-category';
import { ExpenseCategoryService } from './service/expense-category.service';

@Component({
  templateUrl: './expense-category.component.html'
})
export class ExpenseCategoryComponent implements OnInit {

  userCategories: ExpenseCategory[];
  categoriesToSee: ExpenseCategory[];
  detailingCategory: ExpenseCategory;
  
  @ViewChild('addNewModal') public addNewModal: ModalDirective;
  @ViewChild('newCategory') public newCategory: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private expenseCategoryService: ExpenseCategoryService
  ) { }
  
  ngOnInit(): void {
    this.detailingCategory = null;
    this.expenseCategoryService
        .getByAccount()
        .subscribe(response => {
          this.userCategories = response;
          this.categoriesToSee = this.userCategories.filter(cat => cat.level === 1);
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
    this.categoriesToSee = this.userCategories.filter(cat => cat.level === 1);
  } 

  findParentCategoryOf(category: ExpenseCategory): void {
    this.expenseCategoryService
        .getParentCategory(category)
        .subscribe(response => {
          this.detailingCategory = response;
          if (response === null) {
            this.returnRootLevel();
          } else {
            this.categoriesToSee = this.userCategories.filter(cat => response.id === cat.id)[0].childrenCategories;
          }
        });
  } 

  addNew(): void {
    let parentCategory: ExpenseCategory;
    if (this.detailingCategory === null) {
      parentCategory = new ExpenseCategory();
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
