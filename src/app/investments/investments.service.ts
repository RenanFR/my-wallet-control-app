import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentPosition } from '../shared/models/investment.position';
import { environment } from '../../environments/environment';

const baseUrl: string = `${environment.SERVER_URL}/investments`;

@Injectable()
export class InvestmentsService {

  constructor(private http: HttpClient) { }

  public getInvestments(): Observable<InvestmentPosition> {
    return this.http.get<InvestmentPosition>(baseUrl);
  }  

}
