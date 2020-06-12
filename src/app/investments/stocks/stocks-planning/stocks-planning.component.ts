import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StocksAllocationBySector } from '../../../shared/models/stocks.allocation.by.sector';
import { StocksService } from '../stocks.service';

@Component({
  templateUrl: './stocks-planning.component.html'
})
export class StocksPlanningComponent implements OnInit {

  stocksAllocationPlanned: StocksAllocationBySector[];

  newStocksAllocationPlan: StocksAllocationBySector = new StocksAllocationBySector();

  @ViewChild('addNewModal') public addNewModal: ModalDirective;

  constructor(
    private route: ActivatedRoute,
    private stocksService: StocksService    
  ) { }

  ngOnInit(): void {
    this.stocksService
        .getStocksInfoByUser()
        .subscribe(response => {
          this.stocksAllocationPlanned = response.stocksAllocationPlanned;
        });       
  }

  addNewStocksAllocationBySector(): void {
    this.stocksService
      .addNewStocksAllocationBySector(this.newStocksAllocationPlan)
      .subscribe(response => {
            this.ngOnInit();
            this.addNewModal.hide();
      });    
  }   

}
