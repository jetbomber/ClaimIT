import { DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize, map} from "rxjs/operators";
import { Company } from 'src/app/_models/company';
import { SortProps } from 'src/app/_models/sort.props';
import { CompanyService } from 'src/app/_services/company.service';

export class CompanyListDataSource implements DataSource<Company> {

    private companyListSubject = new BehaviorSubject<Company[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private _totalRows = 0;

    private _itemsPerPage = 10;

    public loading$ = this.loadingSubject.asObservable();

    get total(): number {return this._totalRows}

    get itemsPerPage(): number {return this._itemsPerPage}

    constructor(private companyService: CompanyService) {}

    loadCompanies(sortProps: SortProps) {

        this.loadingSubject.next(true);

        this.companyService.getCompanies(sortProps).pipe(
                map(response => {
                    this.companyListSubject.next(response.result)
                    this._totalRows = response.pagination.totalItems
                    this._itemsPerPage = response.pagination.itemsPerPage
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe();
    }

    connect(): Observable<Company[]> {
        return this.companyListSubject.asObservable();
    }

    disconnect(): void {
        this.companyListSubject.complete();
        this.loadingSubject.complete();
    }
  
}
