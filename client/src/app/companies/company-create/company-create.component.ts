import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CompanyService } from 'src/app/_services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  public createCompanyForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private location: Location,
              private companyService: CompanyService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCompanyForm = this.fb.group({
      companyName: ['', Validators.required],
      commencementDate: ['', Validators.required],
      yearEndDate: ['', Validators.required],
      groupTerminationDate: [''],
      includeHsaClaims: [''],
      includeCostPlusClaims: ['']
    })
  }

  public cancel() {
    this.location.back();
  }

  public createCompany() {
    this.companyService.createCompany(this.createCompanyForm.value).subscribe(() => {
      this.toastr.success('Company created successfully');
    }, error => {
      this.validationErrors = error;
    })
  }
  
}
