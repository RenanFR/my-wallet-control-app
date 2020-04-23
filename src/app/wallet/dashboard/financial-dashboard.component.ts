import { Component, OnInit } from '@angular/core';
import { FinancialDashboardService } from './financial-dashboard.service';
import { BankStatement } from '../../shared/models/bank.statement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-dashboard',
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.css']
})
export class FinancialDashboardComponent implements OnInit {

  bankStatement: BankStatement;

  constructor(
    private route: ActivatedRoute,
    private financialDashboardService: FinancialDashboardService
  ) { }

  ngOnInit(): void {
    let account = this.route.snapshot.params.account;
    this.financialDashboardService.upload(account)
        .subscribe(response => {
          console.log(response);
          this.bankStatement = response;
        });
  }

}
