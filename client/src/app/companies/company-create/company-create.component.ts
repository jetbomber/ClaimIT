import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/_services/company.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Output() reloadCompanies: EventEmitter<boolean> = new EventEmitter();
  public createCompanyForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private companyService: CompanyService,
              private fb: FormBuilder,
              private msg: PopUpMessageService) {

  }

  ngOnInit(): void {
    this.createCompanyForm = this.fb.group({
      companyName: ['', Validators.required],
      commencementDate: ['', Validators.required],
      yearEndDate: ['', Validators.required],
      includeHsaClaims: [false],
      includeCostPlusClaims: [false]
    })
  }

  public cancel() {
    this.modalRef.hide();
  }

  public createCompany() {
    this.companyService.createCompany(this.createCompanyForm.value).subscribe(() => {
      this.msg.success('Company created successfully');
      this.cancel();
      this.reloadCompanies.emit(true);
    }, error => {
      this.validationErrors = error;
    })
  }
  
}
