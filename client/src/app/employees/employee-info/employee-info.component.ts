import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomValidators } from 'src/app/utilities/custom.validators';
import { FormActions } from 'src/app/utilities/enum';
import { ClassList } from 'src/app/_models/classlist';
import { CompanyList } from 'src/app/_models/companylist';
import { CompensationType } from 'src/app/_models/compensationtypes';
import { DivisionList } from 'src/app/_models/divisionlist';
import { Employee } from 'src/app/_models/employee';
import { Gender } from 'src/app/_models/gender';
import { MaritalStatus } from 'src/app/_models/maritalstatus';
import { Province } from 'src/app/_models/province';
import { ClassService } from 'src/app/_services/class.service';
import { CompanyService } from 'src/app/_services/company.service';
import { DivisionService } from 'src/app/_services/division.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee: Employee;
  @Input() employeeOperation: FormActions;
  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter();
  employeeForm: FormGroup;
  companies: CompanyList[];
  provinces: Province[];
  genders: Gender[];
  classes: ClassList[];
  divisions: DivisionList[];
  compensationTypes: CompensationType[];
  maritalStatuses: MaritalStatus[];
  showCompanyList: boolean = false;

  validationErrors: string[] = [];
  companyErrors: string[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.employeeForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private employeeService: EmployeeService,
              private lookUpService: LookupService,
              private classService: ClassService,
              private divisionService: DivisionService,
              private companyService: CompanyService,
              private msg: PopUpMessageService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
      this.provinces = null;
      this.genders = null;
      this.classes = null;
      this.divisions = null;
      this.maritalStatuses = null;
      this.compensationTypes = null;
      this.companies = null;
      this.getProvinces();
      this.getGenders();
      this.getMaritalStatuses();
      this.getCompensationTypes();
      this.getCompanies();
      if (this.employeeOperation == FormActions.Create) {
        this.showCompanyList = true;
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName=='employee' && chng.currentValue != null) {
        this.initializeForm(chng.currentValue);
      } 
    }
    
  }

  private initializeForm(employee : Employee) {
    if (this.employeeOperation==FormActions.Edit) {
      this.getDivisions(this.employee.companyId);
      this.getClasses(this.employee.companyId);
    } 
    this.employeeForm = this.fb.group({
      companyId: [employee.companyId],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      middleName: [employee.middleName, Validators.required],
      employeeNumber: [employee.employeeNumber, Validators.required],
      sin: [employee.sin, CustomValidators.sin("sin")],
      birthDate: [employee.birthDate==null?null:new Date(employee.birthDate), Validators.required],
      genderId:[employee.genderId,Validators.required],
      maritalStatusId:[employee.maritalStatusId,Validators.required],
      emailAddress: [employee.emailAddress,Validators.email],
      phoneNumber: [employee.phoneNumber,CustomValidators.phoneNumber("phoneNumber")],
      address:[employee.address,Validators.required],
      city:[employee.city,Validators.required],
      divisionId:[employee.divisionId,Validators.required],
      classId:[employee.classId,Validators.required],
      provinceId:[employee.provinceId,Validators.required],
      postalCode:[employee.postalCode,CustomValidators.postalCode("postalCode")],
      eligibilityDate: [employee.eligibilityDate==null?null:new Date(employee.eligibilityDate), Validators.required],
      hireDate: [employee.hireDate==null?null:new Date(employee.hireDate), Validators.required],
      startDate: [employee.startDate==null?null:new Date(employee.startDate), Validators.required],
      terminationDate: [employee.terminationDate==null?null:new Date(employee.terminationDate)],
      occupation: [employee.occupation, Validators.required],
      compensation: [employee.compensation, CustomValidators.isNumeric("compensation")],
      compensationTypeId: [employee.compensationTypeId, Validators.required],
      insuranceCompany: [employee.insuranceCompany],
      policyNumber: [employee.policyNumber],
      smoker: [employee.smoker],
      cob: [employee.cob],
      eft: [employee.eft],
      mailCompany: [employee.mailCompany],
      evidence: [employee.evidence],
      dependentCoverage: [employee.dependentCoverage]
    });
    this.employeeForm.get("companyId").valueChanges
    .subscribe(companyId=> {
      this.divisions = null;
      this.classes = null;
      this.companyErrors = [];
      this.getDivisions(companyId);
      this.getClasses(companyId);
      this.employee.companyId=companyId;
    })
  }

  private getProvinces() {
    this.lookUpService.getProvinces().pipe(
        map(response => {
          this.provinces = response;
        })
    ).subscribe();
  }

  private getGenders() {
    this.lookUpService.getGenders().pipe(
        map(response => {
          this.genders = response;
        })
    ).subscribe();
  }

  private getCompensationTypes() {
    this.lookUpService.getCompensationTypes().pipe(
        map(response => {
          this.compensationTypes = response;
        })
    ).subscribe();
  }

  private getMaritalStatuses() {
    this.lookUpService.getMaritalStatuses().pipe(
        map(response => {
          this.maritalStatuses = response;
        })
    ).subscribe();
  }

  private getDivisions(companyId: number) {
    this.divisionService.getDivisionListForCompany(companyId).pipe(
        map(response => {
          if (response.length>0) {
            this.divisions = response;
          } else {
            this.companyErrors.push("No Divisions Defined");
            this.msg.error('Define the Divisions for the selected company before creating employees','No Divisions defined');
          }
        })
    ).subscribe();
  }

  private getClasses(companyId: number) {
    this.classService.getClassListForCompany(companyId).pipe(
        map(response => {
          if (response.length>0) {
            this.classes = response;
          } else {
            this.companyErrors.push("No Classes Defined");
            this.msg.error('Define the Classes for the selected company before creating employees','No Classes defined');
          }
        })
    ).subscribe();
  }

  private getCompanies() {
    this.companyService.getCompanyList().pipe(
        map(response => {
          this.companies = response;
        })
    ).subscribe();
  }

  private retrieveFormData() {
    this.employee.address = this.employeeForm.get("address").value;
    this.employee.birthDate = this.employeeForm.get("birthDate").value;
    this.employee.city = this.employeeForm.get("city").value;
    this.employee.classId = this.employeeForm.get("classId").value;
    this.employee.cob = this.employeeForm.get("cob").value;
    this.employee.compensation = this.employeeForm.get("compensation").value;
    this.employee.compensationTypeId = this.employeeForm.get("compensationTypeId").value;
    this.employee.dependentCoverage = this.employeeForm.get("dependentCoverage").value;
    this.employee.divisionId = this.employeeForm.get("divisionId").value;
    this.employee.eft = this.employeeForm.get("eft").value;
    this.employee.eligibilityDate = this.employeeForm.get("eligibilityDate").value;
    this.employee.emailAddress = this.employeeForm.get("emailAddress").value;
    this.employee.employeeNumber = this.employeeForm.get("employeeNumber").value;
    this.employee.evidence = this.employeeForm.get("evidence").value;
    this.employee.firstName = this.employeeForm.get("firstName").value;
    this.employee.genderId = this.employeeForm.get("genderId").value;
    this.employee.hireDate = this.employeeForm.get("hireDate").value; 
    this.employee.insuranceCompany = this.employeeForm.get("insuranceCompany").value; 
    this.employee.lastName = this.employeeForm.get("lastName").value; 
    this.employee.mailCompany = this.employeeForm.get("mailCompany").value; 
    this.employee.maritalStatusId = this.employeeForm.get("maritalStatusId").value; 
    this.employee.middleName = this.employeeForm.get("middleName").value; 
    this.employee.occupation = this.employeeForm.get("occupation").value; 
    this.employee.phoneNumber = this.employeeForm.get("phoneNumber").value; 
    this.employee.policyNumber = this.employeeForm.get("policyNumber").value; 
    this.employee.postalCode = this.employeeForm.get("postalCode").value; 
    this.employee.provinceId = this.employeeForm.get("provinceId").value; 
    this.employee.sin = this.employeeForm.get("sin").value; 
    this.employee.smoker = this.employeeForm.get("smoker").value; 
    this.employee.startDate = this.employeeForm.get("startDate").value; 
    this.employee.terminationDate = this.employeeForm.get("terminationDate").value; 
  }

  private updateEmployee() {
    this.retrieveFormData();
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.msg.success('Employee updated successfully');
    }, error => {
      this.validationErrors = error;
    })
  }

  private createEmployee() {
    this.retrieveFormData();
    this.employeeService.createEmployee(this.employee).subscribe(() => {
      this.closeWindow.emit(true);
      this.msg.success('Employee created successfully');
    }, error => {
      this.validationErrors = error;
    })
  }

  public handleSubmission() {
    if (this.employeeOperation==FormActions.Edit) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }
}
