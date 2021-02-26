import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Dependent } from "src/app/_models/dependent";
import { SortProps } from "src/app/_models/sort.props";
import { DependentService } from "src/app/_services/dependent.service";

export class DependentListDataSource implements DataSource<Dependent> {

    private dependentListSubject = new BehaviorSubject<Dependent[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    private _itemsPerPage = 10;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    get itemsPerPage(): number {return this._itemsPerPage}

    constructor(private dependentService: DependentService) {}

    loadDependents(sortProps: SortProps, employeeId: number) {

        this.loadingSubject.next(true);

        this.dependentService.getDependents(sortProps,employeeId).pipe(
                map(response => {
                    this.dependentListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                    this._itemsPerPage = response.pagination.itemsPerPage
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(): Observable<Dependent[]> {
        return this.dependentListSubject.asObservable();
    }

    disconnect(): void {
        this.dependentListSubject.complete();
        this.loadingSubject.complete();
    }
  
}