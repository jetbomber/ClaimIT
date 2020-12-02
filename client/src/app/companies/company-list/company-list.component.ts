import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { CompanyListDataSource } from './company-list-data-source';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements AfterViewInit, OnInit   {
  company:Company;
  dataSource: CompanyListDataSource;
  displayColumns = ["id","companyName","yearEndDate","groupTerminationDate","commencementDate","includeHsaClaims","includeCostPlusClaims"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new CompanyListDataSource(this.companyService);
    this.dataSource.loadCompanies('','asc',0, 5);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadCompaniesPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange,this.paginator.page)
    .pipe(
        tap(() => this.loadCompaniesPage())
    )
    .subscribe();
  }

  loadCompaniesPage() {
    this.dataSource.loadCompanies(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  emptyDate(dateValue: Date): boolean{
    return (dateValue == null);
  }

  clickedRow(row) {
    console.log('Row clicked: ', row);
  }

}
