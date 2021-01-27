import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constants';
import { FormActions } from 'src/app/utilities/enum';
import { setSortingParameters } from 'src/app/utilities/sort.utilities';
import { Class } from 'src/app/_models/class';
import { ClassService } from 'src/app/_services/class.service';
import { newClass } from './class-common';
import { ClassListDataSource } from './class-list-data-source';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  @Input() companyId: number;
  classOperation: FormActions;
  classData:Class;
  dataSource: ClassListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","ClassNumber","ClassName","PersonalHealthMaximum","ClassWaitingPeriod","IsHsaClass"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private classService: ClassService, 
              private router: Router) { }

  ngOnInit() {
    this.classData = null;
    this.dataSource = new ClassListDataSource(this.classService);
    this.dataSource.loadClasses(setSortingParameters('','asc','ClassName',0,this.itemsPerPage),this.companyId);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadClassesPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange,this.paginator.page)
    .pipe(
        tap(() => this.loadClassesPage())
    )
    .subscribe();
  }

  reloadClasses(reload: boolean) {
    if (reload) {this.loadClassesPage();}
  }

  private loadClassesPage() {
    this.dataSource.loadClasses(setSortingParameters(this.input.nativeElement.value,
                                                     this.sort.direction,
                                                     this.sort.active,
                                                     this.paginator.pageIndex,
                                                     this.paginator.pageSize),
                                                     this.companyId);
  }

  public selectClass(classData: Class) {
    this.classOperation = FormActions.Edit;
    this.classData=classData;
  }

  public createClass(companyId: number) {
    this.classOperation = FormActions.Create;
    this.classData = newClass(companyId);
  }

}
