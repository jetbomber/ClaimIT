import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, finalize, map } from 'rxjs/operators';
import { FormActions } from 'src/app/utilities/enum';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'], 
})
export class CompanyDetailComponent implements OnInit {
  companyOperation: FormActions;
  companyId: number;
  company: Company;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.companyId = +params.get('id');
      this.loadCompany();
      this.companyOperation = FormActions.Edit;
    });
  }

  private loadCompany() {
    this.loadingSubject.next(true);
    this.companyService.getCompany(this.companyId).pipe(
        map(response => {
          this.company = response;
        }),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe();
  }

}
