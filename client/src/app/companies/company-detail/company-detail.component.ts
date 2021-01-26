import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, finalize, map } from 'rxjs/operators';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'], 
})
export class CompanyDetailComponent implements OnInit {
  companyForm: FormGroup;
  companyId: number;
  company: Company;
  validationErrors: string[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.companyForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private msg: PopUpMessageService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.companyId = +params.get('id');
      this.loadCompany();
    });
  }

  initializeForm(company : Company) {
    this.companyForm = this.fb.group({
      id: [company.id],
      companyName: [company.companyName, Validators.required],
      commencementDate: [new Date(company.commencementDate), Validators.required],
      yearEndDate: [new Date(company.yearEndDate), Validators.required],
      groupTerminationDate: [company.groupTerminationDate==null?null:new Date(company.groupTerminationDate)],
      includeHsaClaims: [company.includeHsaClaims],
      includeCostPlusClaims: [company.includeCostPlusClaims]
    })
  }

  private loadCompany() {
    this.loadingSubject.next(true);
    this.companyService.getCompany(this.companyId).pipe(
        map(response => {
          this.company = response;
          this.initializeForm(this.company);
        }),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe();
  }

  public updateCompany() {
    this.companyService.updateCompany(this.companyForm.value).subscribe(() => {
      this.msg.success('Company updated successfully');
    }, error => {
      this.msg.error('Company was not updated','Error');
      this.validationErrors = error;
    })
  }

}
