import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileExtension } from './file.extension';
import { StatementUploadDTO } from './statement.upload.dto';
import { UploadService } from './upload.service';
import { dateRangeCustomValidator } from './validation/date.range.custom.validator';
import { verifyMaximumPeriod } from './validation/verify.maximum.period';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: File[] = [];
  previews: string[] = [];
  bankStatementForm: FormGroup;
  enableColumnControls: boolean = false;
  supportedExtensions: string = '.pdf,.xls,.xlsx,.csv,.pdf';
  acceptedExtensions: string = '.pdf';
  extensions = FileExtension;
  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 
    'F', 'G', 'H', 'I', 'K', 
    'L', 'M', 'N', 'O', 'P', 
    'Q', 'R', 'S', 'T', 'U', 
    'V', 'W', 'X', 'Y', 'Z'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
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
      columnDate: [ 'A' ],
      columnDescription: [ 'B' ],
      columnValue: [ 'C' ],
      columnBalance: [ 'D' ]
    }, {
      validator: verifyMaximumPeriod
    });
  }

  onUpload(): void {
    const statementUploadDTO = this.bankStatementForm.getRawValue() as StatementUploadDTO;
    this.uploadService
      .upload(statementUploadDTO, this.files[0])
      .subscribe(r => {
        const status = r.status;
        const accountToRedirect = r.body;
        console.log('Response status ' + status + ', account to redirect ' + accountToRedirect);
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
