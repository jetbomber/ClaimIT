import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { CompanyListDataSource } from './company-list-data-source';
import { setSortingParameters } from '../../utilities/sort.utilities';
import { Constants } from '../../utilities/constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements AfterViewInit, OnInit   {
  modalRef: BsModalRef;
  company:Company;
  dataSource: CompanyListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","CompanyName","YearEndDate","GroupTerminationDate","CommencementDate","IncludeHsaClaims","IncludeCostPlusClaims"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private companyService: CompanyService, 
              private router: Router,
              private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.dataSource = new CompanyListDataSource(this.companyService);
    this.dataSource.loadCompanies(setSortingParameters('','asc','CompanyName',0,this.itemsPerPage));
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

  reloadCompanies(reload: boolean) {
    if (reload) {this.loadCompaniesPage();}
  }

  loadCompaniesPage() {
    this.dataSource.loadCompanies(setSortingParameters(this.input.nativeElement.value,
                                                       this.sort.direction,
                                                       this.sort.active,
                                                       this.paginator.pageIndex,
                                                       this.paginator.pageSize));
  }

  emptyDate(dateValue: Date): boolean{
    return (dateValue == null);
  }

  selectCompany(company) {
    this.router.navigateByUrl('/companies/'+company.id);
  }

}
