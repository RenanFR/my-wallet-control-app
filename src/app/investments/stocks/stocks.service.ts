import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StocksAllocationBySector } from '../../shared/models/stocks.allocation.by.sector';
import { UserStockMarketAllocation } from '../../shared/models/user.stock.market.allocation';

const base: string = `${environment.SERVER_URL}/investments`;

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }


  public getStocksInfoByUser(): Observable<UserStockMarketAllocation> {
    return this
      .http
      .get<UserStockMarketAllocation>(`${base}/stocks/info`);
  }  

  public addNewStocksAllocationBySector(stocksAllocation: StocksAllocationBySector): Observable<StocksAllocationBySector> {
    return this
      .http
      .post<StocksAllocationBySector>(`${base}/stocks/allocation`, stocksAllocation);
  }    

}
