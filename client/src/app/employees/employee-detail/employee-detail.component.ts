import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CustomValidators } from 'src/app/utilities/custom.validators';
import { ClassList } from 'src/app/_models/classlist';
import { CompensationType } from 'src/app/_models/compensationtypes';
import { DivisionList } from 'src/app/_models/divisionlist';
import { Employee } from 'src/app/_models/employee';
import { Gender } from 'src/app/_models/gender';
import { MaritalStatus } from 'src/app/_models/maritalstatus';
import { Province } from 'src/app/_models/province';
import { ClassService } from 'src/app/_services/class.service';
import { DivisionService } from 'src/app/_services/division.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number;
  employee: Employee;
  provinces: Province[];
  genders: Gender[];
  classes: ClassList[];
  divisions: DivisionList[];
  compensationTypes: CompensationType[];
  maritalStatuses: MaritalStatus[];

  validationErrors: string[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.employeeForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private lookUpService: LookupService,
              private classService: ClassService,
              private divisionService: DivisionService,
              private msg: PopUpMessageService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.employeeId = +params.get('id');
      this.provinces = null;
      this.genders = null;
      this.classes = null;
      this.divisions = null;
      this.maritalStatuses = null;
      this.compensationTypes = null;
      this.getProvinces();
      this.getGenders();
      this.getMaritalStatuses();
      this.getCompensationTypes();
      this.loadEmployee();
    });
  }

  initializeForm(employee : Employee) {
    this.getDivisions(this.employee.companyId);
    this.getClasses(this.employee.companyId);
    this.employeeForm = this.fb.group({
      id: [employee.id],
      companyId: [employee.companyId],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      middleName: [employee.lastName, Validators.required],
      employeeNumber: [employee.employeeNumber, Validators.required],
      sin: [employee.sin, Validators.required],
      birthDate: [new Date(employee.birthDate), Validators.required],
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
      eligibilityDate: [new Date(employee.eligibilityDate), Validators.required],
      hireDate: [new Date(employee.hireDate), Validators.required],
      startDate: [new Date(employee.startDate), Validators.required],
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
          this.divisions = response;
        })
    ).subscribe();
  }

  private getClasses(companyId: number) {
    this.classService.getClassListForCompany(companyId).pipe(
        map(response => {
          this.classes = response;
        })
    ).subscribe();
  }

  private loadEmployee() {
    this.loadingSubject.next(true);
    this.employeeService.getEmployee(this.employeeId).pipe(
        map(response => {
          this.employee = response;
          this.initializeForm(this.employee);
        }),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe();
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

  public updateEmployee() {
    this.retrieveFormData();
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.msg.success('Employee updated successfully');
    }, error => {
      this.msg.error('Employee was not updated','Error');
      this.validationErrors = error;
    })
  }

}