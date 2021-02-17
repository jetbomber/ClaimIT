import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Employee } from "src/app/_models/employee";
import { SortProps } from "src/app/_models/sort.props";
import { EmployeeService } from "src/app/_services/employee.service";

export class EmployeeListDataSource implements DataSource<Employee> {

    private employeeListSubject = new BehaviorSubject<Employee[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    private _itemsPerPage = 10;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    get itemsPerPage(): number {return this._itemsPerPage}

    constructor(private employeeService: EmployeeService) {}

    loadEmployees(sortProps: SortProps) {

        this.loadingSubject.next(true);

        this.employeeService.getEmployees(sortProps).pipe(
                map(response => {
                    this.employeeListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                    this._itemsPerPage = response.pagination.itemsPerPage
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(): Observable<Employee[]> {
        return this.employeeListSubject.asObservable();
    }

    disconnect(): void {
        this.employeeListSubject.complete();
        this.loadingSubject.complete();
    }
  
}