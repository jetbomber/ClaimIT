import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormActions } from 'src/app/utilities/enum';
import { Company } from 'src/app/_models/company';
import { newCompany } from '../company-list/company-common';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Output() reloadCompanies: EventEmitter<boolean> = new EventEmitter();
  companyOperation: FormActions;
  company: Company;
  showCloseButton: boolean;

  constructor() {

  }

  ngOnInit(): void {
    this.companyOperation = FormActions.Create;
    this.company = newCompany();
    this.showCloseButton = true;
  }

  closeWindow(close: boolean) {
    if (close) {
      this.cancel();
      this.reloadCompanies.emit(true);
    }
  }

  public cancel() {
    this.modalRef.hide();
  }
  
}
