import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constants';
import { setSortingParameters } from 'src/app/utilities/sort.utilities';
import { Division } from 'src/app/_models/division';
import { DivisionService } from 'src/app/_services/division.service';
import { DivisionListDataSource } from './division-list-data-source';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent implements OnInit {
  @Input() companyId;
  division:Division;
  dataSource: DivisionListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","DivisionNumber","DivisionName","City","GeneralAdminFee"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private divisionService: DivisionService, 
              private router: Router) { }

  ngOnInit() {
    this.dataSource = new DivisionListDataSource(this.divisionService);
    this.dataSource.loadDivisions(setSortingParameters('','asc','DivisionName',0,this.itemsPerPage),this.companyId);
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

  loadDivisionsPage() {
    this.dataSource.loadDivisions(setSortingParameters(this.input.nativeElement.value,
                                                       this.sort.direction,
                                                       this.sort.active,
                                                       this.paginator.pageIndex,
                                                       this.paginator.pageSize),
                                                       this.companyId);
  }

  selectDivision(division) {
    this.router.navigateByUrl('/divisions/'+division.id);
  }

}
