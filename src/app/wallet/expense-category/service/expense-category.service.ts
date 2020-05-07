import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BankStatement } from '../../../shared/models/bank.statement';
import { ExpenseCategory } from '../../../shared/models/expense-category';

const base: string = `${environment.SERVER_URL}/expenses`;

@Injectable()
export class ExpenseCategoryService {

  constructor(private http: HttpClient) { }

  public getByAccount(account: string): Observable<ExpenseCategory[]> {
    return this
      .http
      .get<ExpenseCategory[]>(`${base}/${account}`);  
  }  

  public getParentCategory(category: ExpenseCategory, account: string): Observable<ExpenseCategory> {
    let requestParam = new HttpParams()
        .set('account', account);    
    return this
      .http
      .get<ExpenseCategory>(`${base}/parent/${category.name}`, {params: requestParam});  
  }  

  public addNew(parentCategory: ExpenseCategory, childrenCategory: string): Observable<ExpenseCategory> {
    let body = new HttpParams()
        .set('account', parentCategory.account)
        .set('parentCategory', parentCategory.name)
        .set('childrenCategory', childrenCategory);
    return this
      .http
      .post<ExpenseCategory>(`${base}/${parentCategory.account}`, body);  
  }  
  
}
