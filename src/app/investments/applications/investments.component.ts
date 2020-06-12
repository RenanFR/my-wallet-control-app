import { Component, OnInit } from '@angular/core';
import { InvestmentsService } from '../investments.service';
import { InvestmentPosition } from '../../shared/models/investment.position';

@Component({
  templateUrl: './investments.component.html'
})
export class InvestmentsComponent implements OnInit {

  investmentPosition: InvestmentPosition;

  constructor(private investmentsService: InvestmentsService) { }

  ngOnInit(): void {
    this.investmentsService
      .getInvestments()
      .subscribe((response) => {
        this.investmentPosition = response;
      });
  }

}
