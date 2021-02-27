import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject} from 'rxjs';
import { FormActions } from 'src/app/utilities/enum';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Input() company: Company;
  @Input() companyOperation: FormActions;
  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter();
  companyForm: FormGroup;
  validationErrors: string[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.companyForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private companyService: CompanyService,
              private msg: PopUpMessageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName=='company' && chng.currentValue != null) {
        this.initializeForm(chng.currentValue);
      } 
    }
    
  }

  initializeForm(company : Company) {
    this.companyForm = this.fb.group({
      id: [company.id],
      companyName: [company.companyName, Validators.required],
      commencementDate: [company.commencementDate==null?null:new Date(company.commencementDate), Validators.required],
      yearEndDate: [company.yearEndDate==null?null:new Date(company.yearEndDate), Validators.required],
      groupTerminationDate: [company.groupTerminationDate==null?null:new Date(company.groupTerminationDate)],
      includeHsaClaims: [company.includeHsaClaims],
      includeCostPlusClaims: [company.includeCostPlusClaims]
    })
  }

  private updateCompany() {
    this.companyService.updateCompany(this.companyForm.value).subscribe(() => {
      this.msg.success('Company updated successfully');
    }, error => {
      this.validationErrors = error;
    })
  }

  private createCompany() {
    this.companyForm.removeControl("id");
    this.companyService.createCompany(this.companyForm.value).subscribe(() => {
      this.msg.success('Company created successfully');
      this.closeWindow.emit(true);
    }, error => {
      this.validationErrors = error;
    })

  }

  public handleSubmission() {
    if (this.companyOperation==FormActions.Edit) {
      this.updateCompany();
    } else {
      this.createCompany();
    }
  }

}
