import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BankStatement } from '../../../../shared/models/bank.statement';

const base: string = `${environment.SERVER_URL}/financial`;

@Injectable()
export class BankStatementEntriesService {

  constructor(private http: HttpClient) { }

  public getByAccount(account: string): Observable<BankStatement[]> {
    return this
      .http
      .get<BankStatement[]>(`${base}/${account}`);  
  }  

  public getByUpload(uploadId: string): Observable<BankStatement> {
    return this
      .http
      .get<BankStatement>(`${base}/upload/${uploadId}`);  
  }  
  
}
