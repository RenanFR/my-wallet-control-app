import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankStatement } from '../../shared/models/bank.statement';
import { FileExtension } from '../../shared/models/file.extension';
import { UploadService } from './upload.service';
import { dateRangeCustomValidator } from './validation/date.range.custom.validator';
import { verifyMaximumPeriod } from './validation/verify.maximum.period';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Bank } from '../../shared/models/bank';

@Component({
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {

  files: File[] = [];
  previews: string[] = [];
  bankStatementForm: FormGroup;
  enableColumnControls: boolean = false;
  supportedExtensions: string = '.pdf,.xls,.xlsx,.csv,.pdf';
  acceptedExtensions: string = '.pdf';
  extensions = FileExtension;
  banks = Bank;
  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 
    'F', 'G', 'H', 'I', 'K', 
    'L', 'M', 'N', 'O', 'P', 
    'Q', 'R', 'S', 'T', 'U', 
    'V', 'W', 'X', 'Y', 'Z'
  ];
  accountToRedirect: string;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let now: Date = new Date();
    now.setDate(now.getDate() - 1);
    const today: string = now.toISOString().substring(0, 10);
    now.setDate(now.getDate() - 90);
    const suggestedStart: string = now.toISOString().substring(0, 10);
    this.bankStatementForm = this.formBuilder.group({
      account: [ '',[ Validators.required ] ],
      periodStart: [ suggestedStart, [ dateRangeCustomValidator ] ],
      periodEnd:  [ today, [ dateRangeCustomValidator ] ],
      fileExtension: [ this.extensions.PDF ],
      bank: [ this.banks.INTER ],
      columnDate: [ 'A' ],
      columnDescription: [ 'B' ],
      columnValue: [ 'C' ],
      columnBalance: [ 'D' ]
    }, {
      validator: verifyMaximumPeriod
    });
  }

  onUpload(): void {
    const statementUploadDTO = this.bankStatementForm.getRawValue() as BankStatement;
    this.uploadService
      .upload(statementUploadDTO, this.files[0])
      .pipe(finalize(() => {
        this.router.navigate(['/wallet/entries', this.accountToRedirect]);
      }))
      .subscribe(r => {
        const status = r.status;
        if (status === 200) {
          this.accountToRedirect = r.body;
        }
      });
  }

  handleFiles(files: File[]): void {
    this.files = files;
    for (let index = 0; index < files.length; index++) {
      const file = this.files[index];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.previews.push(event.target.result);
      };
    }
  }
  
  enableControlAndExtension(extension: FileExtension): void {
    if (extension == FileExtension.CSV) {
      this.enableColumnControls = true;
      this.acceptedExtensions = this.supportedExtensions.split(',').filter(ext => ext === '.csv')[0];
    } else if (extension == FileExtension.XLSX) {
      this.enableColumnControls = true;
      this.acceptedExtensions = this.supportedExtensions.split(',').filter(ext => ext === '.xlsx')[0];
    } else if (extension == FileExtension.PDF) {
      this.enableColumnControls = false;
      this.acceptedExtensions = this.supportedExtensions.split(',').filter(ext => ext === '.pdf')[0];
    }
  }

}
