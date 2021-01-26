import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Class } from "src/app/_models/class";
import { SortProps } from "src/app/_models/sort.props";
import { ClassService } from "src/app/_services/class.service";

export class ClassListDataSource implements DataSource<Class> {

    private classListSubject = new BehaviorSubject<Class[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    private _itemsPerPage = 10;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    get itemsPerPage(): number {return this._itemsPerPage}

    constructor(private classService: ClassService) {}

    loadClasses(sortProps: SortProps, companyId: number) {

        this.loadingSubject.next(true);

        this.classService.getClasses(sortProps,companyId).pipe(
                map(response => {
                    this.classListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                    this._itemsPerPage = response.pagination.itemsPerPage
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(): Observable<Class[]> {
        return this.classListSubject.asObservable();
    }

    disconnect(): void {
        this.classListSubject.complete();
        this.loadingSubject.complete();
    }
  
}