import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CustomValidators } from 'src/app/utilities/custom.validators';
import { ClassList } from 'src/app/_models/classlist';
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
      this.getProvinces();
      this.getGenders();
      this.getMaritalStatuses();
      this.loadEmployee();
    });
  }

  initializeForm(employee : Employee) {
    this.getDivisions(this.employee.companyId);
    this.getClasses(this.employee.companyId);
    this.employeeForm = this.fb.group({
      id: [employee.id],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      middleName: [employee.lastName, Validators.required],
      employeeNumber: [employee.employeeNumber, Validators.required],
      SIN: [employee.sin, Validators.required],
      birthDate: [new Date(employee.birthDate), Validators.required],
      genderId:[employee.genderId,Validators.required],
      maritalStatusId:[employee.maritalStatusId,Validators.required],
      emailAddress: [employee.emailAddress,Validators.email],
      phoneNumber: [employee.phoneNumber,CustomValidators.phoneNumber("phoneNumber")],
      address:[employee.address,Validators.required],
      city:[employee.city,Validators.required],
      provinceId:[employee.provinceId,Validators.required],
      postalCode:[employee.postalCode,CustomValidators.postalCode("postalCode")],
      divisionId:[employee.divisionId,Validators.required],
      classId:[employee.classId,Validators.required]
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

  public updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(() => {
      this.msg.success('Employee updated successfully');
    }, error => {
      this.msg.error('Employee was not updated','Error');
      this.validationErrors = error;
    })
  }

}