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

  public getByAccount(): Observable<ExpenseCategory[]> {
    return this
      .http
      .get<ExpenseCategory[]>(`${base}`);  
  }  

  public getParentCategory(category: ExpenseCategory): Observable<ExpenseCategory> {
    let requestParam = new HttpParams();    
    return this
      .http
      .get<ExpenseCategory>(`${base}/parent/${category.name}`, {params: requestParam});  
  }  

  public addNew(parentCategory: ExpenseCategory, childrenCategory: string): Observable<ExpenseCategory> {
    let body = new HttpParams()
        .set('parentCategory', parentCategory.name)
        .set('childrenCategory', childrenCategory);
    return this
      .http
      .post<ExpenseCategory>(`${base}`, body);  
  }  

  public updateAllEntriesCategory(bankStatement: BankStatement): Observable<any> {
    return this
      .http
      .patch(`${base}/entries`, bankStatement);  
  }    
  
}
