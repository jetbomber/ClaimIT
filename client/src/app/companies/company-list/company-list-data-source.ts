import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";;
import {catchError, finalize, map} from "rxjs/operators";
import { Company } from 'src/app/_models/company';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { CompanyService } from 'src/app/_services/company.service';

export class CompanyListDataSource implements DataSource<Company> {

    private companyListSubject = new BehaviorSubject<Company[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    constructor(private companyService: CompanyService) {

    }

    loadCompanies(filter: string, sortDirection: string, page?: number, itemsPerPage?: number) {

        this.loadingSubject.next(true);

        this.companyService.getCompanies(filter,sortDirection,page,itemsPerPage).pipe(
                map(response => {
                    this.companyListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(collectionViewer: CollectionViewer): Observable<Company[]> {
        console.log("Connecting data source");
        return this.companyListSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.companyListSubject.complete();
        this.loadingSubject.complete();
    }
  
}
