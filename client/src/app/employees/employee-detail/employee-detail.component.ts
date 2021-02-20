import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: number;
  employee: Employee;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.employeeId = +params.get('id');
      this.loadEmployee();
    });
  }

  private loadEmployee() {
    this.loadingSubject.next(true);
    this.employeeService.getEmployee(this.employeeId).pipe(
        map(response => {
          this.employee = response;
        }),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe();
  }

}