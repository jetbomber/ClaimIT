import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { fromEvent, merge } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constants';
import { FormActions } from 'src/app/utilities/enum';
import { setSortingParameters } from 'src/app/utilities/sort.utilities';
import { Division } from 'src/app/_models/division';
import { FederalTax } from 'src/app/_models/federaltax';
import { Province } from 'src/app/_models/province';
import { DivisionService } from 'src/app/_services/division.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { DivisionListDataSource } from './division-list-data-source';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent implements OnInit {
  @Input() companyId: number;
  divisionOperation: FormActions;
  division:Division;
  provinces: Province[];
  federalTaxes: FederalTax[];
  dataSource: DivisionListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","DivisionNumber","DivisionName","City","ProvinceName","GeneralAdminFee"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private divisionService: DivisionService, 
              private lookUpService: LookupService,
              private router: Router) { }

  ngOnInit() {
    this.division = null;
    this.provinces = null;
    this.federalTaxes = null;
    this.dataSource = new DivisionListDataSource(this.divisionService);
    this.dataSource.loadDivisions(setSortingParameters('','asc','DivisionName',0,this.itemsPerPage),this.companyId);
    this.getProvinces();
    this.getFederalTaxes();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadDivisionsPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange,this.paginator.page)
    .pipe(
        tap(() => this.loadDivisionsPage())
    )
    .subscribe();
  }

  reloadDivisions(reload: boolean) {
    if (reload) {this.loadDivisionsPage();}
  }

  private getProvinces() {
    this.lookUpService.getProvinces().pipe(
        map(response => {
          this.provinces = response;
        })
    ).subscribe();
  }

  private getFederalTaxes() {
    this.lookUpService.getFederalTaxes().pipe(
        map(response => {
          this.federalTaxes = response;
        })
    ).subscribe();
  }

  private loadDivisionsPage() {
    this.dataSource.loadDivisions(setSortingParameters(this.input.nativeElement.value,
                                                       this.sort.direction,
                                                       this.sort.active,
                                                       this.paginator.pageIndex,
                                                       this.paginator.pageSize),
                                                       this.companyId);
  }

  public selectDivision(division: Division) {
    this.divisionOperation = FormActions.Edit;
    this.division=division;
  }

  public createDivision(companyId: number) {
    this.divisionOperation = FormActions.Create;
    const newDivision = <Division>{};
    newDivision.companyId = companyId;
    newDivision.divisionNumber = null;
    newDivision.divisionName = null;
    newDivision.generalAdminFee = null;;
    newDivision.address = null;
    newDivision.city = null;
    newDivision.provinceId = null;
    newDivision.postalCode = null;
    newDivision.contactPersonName = null;
    newDivision.contactPersonPhoneNumber = null;
    newDivision.contactPersonPhoneNumberExt = null;
    newDivision.contactPersonEmailAddress = null;
    newDivision.contactPersonFax = null;
    this.division=newDivision;
  }

}
