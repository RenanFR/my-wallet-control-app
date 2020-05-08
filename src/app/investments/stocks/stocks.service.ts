import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const base: string = `${environment.SERVER_URL}/expenses`;

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }
}
