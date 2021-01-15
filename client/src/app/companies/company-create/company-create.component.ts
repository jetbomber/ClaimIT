import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/_services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  public createCompanyForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private companyService: CompanyService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {

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
      this.toastr.success('Company created successfully');
      this.modalRef.hide();
      location.reload();
    }, error => {
      this.validationErrors = error;
    })
  }
  
}
