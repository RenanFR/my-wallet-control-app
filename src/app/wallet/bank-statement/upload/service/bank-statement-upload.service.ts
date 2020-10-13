import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BankStatement } from '../../../../shared/models/bank.statement';

const base: string = `${environment.SERVER_URL}/upload`;

@Injectable()
export class BankStatementUploadService {

  constructor(private http: HttpClient) { }

  public upload(statementUploadDTO: BankStatement, file: File): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
          .append('Content-Type', 'multipart/form-data');
    const form = new FormData();
    form.append('userId', statementUploadDTO.userId);
    form.append('periodStart', statementUploadDTO.periodStart);
    form.append('periodEnd', statementUploadDTO.periodEnd);
    form.append('fileExtension', statementUploadDTO.fileExtension);
    form.append('bankAccount', statementUploadDTO.bankAccount);
    form.append('bank', statementUploadDTO.bank);
    form.append('columnDate', statementUploadDTO.columnDate);
    form.append('columnDescription', statementUploadDTO.columnDescription);
    form.append('columnValue', statementUploadDTO.columnValue);
    form.append('columnBalance', statementUploadDTO.columnBalance);
    form.append('file', file);
    form.append('uploadedAt', new Date().toISOString());
    return this
      .http
      .post(base, form, 
      {  
        reportProgress: true,  
        responseType: 'text',
        observe: 'events',
        headers: headers
      });  
  }  
  
}
