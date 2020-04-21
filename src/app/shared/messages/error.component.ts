import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wallet-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

}
