import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Division } from "src/app/_models/division";
import { SortProps } from "src/app/_models/sort.props";
import { DivisionService } from "src/app/_services/division.service";

export class DivisionListDataSource implements DataSource<Division> {

    private divisionListSubject = new BehaviorSubject<Division[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    private _itemsPerPage = 10;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    get itemsPerPage(): number {return this._itemsPerPage}

    constructor(private divisionService: DivisionService) {}

    loadDivisions(sortProps: SortProps, companyId: number) {

        this.loadingSubject.next(true);

        this.divisionService.getDivisions(sortProps,companyId).pipe(
                map(response => {
                    this.divisionListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                    this._itemsPerPage = response.pagination.itemsPerPage
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(): Observable<Division[]> {
        return this.divisionListSubject.asObservable();
    }

    disconnect(): void {
        this.divisionListSubject.complete();
        this.loadingSubject.complete();
    }
  
}