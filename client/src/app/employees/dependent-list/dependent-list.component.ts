import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constants';
import { FormActions } from 'src/app/utilities/enum';
import { setSortingParameters } from 'src/app/utilities/sort.utilities';
import { Dependent } from 'src/app/_models/dependent';
import { DependentRelationshipType } from 'src/app/_models/dependentrelationshiptypes';
import { Employee } from 'src/app/_models/employee';
import { Gender } from 'src/app/_models/gender';
import { DependentService } from 'src/app/_services/dependent.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { newDependent } from './dependent-common';
import { DependentListDataSource } from './dependent-list-data-source';

@Component({
  selector: 'app-dependent-list',
  templateUrl: './dependent-list.component.html',
  styleUrls: ['./dependent-list.component.css']
})
export class DependentListComponent implements OnInit {
  @Input() employee: Employee;
  dependentOperation: FormActions;
  dependent:Dependent;
  dependentRelationshipTypes: DependentRelationshipType[];
  genders: Gender[];
  dataSource: DependentListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","FirstName","LastName","BirthDate","DependentRelationshipTypeName"];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private dependentService: DependentService, 
              private lookUpService: LookupService) { }

  ngOnInit() {
    this.dependent = null;
    this.dependentRelationshipTypes = null;
    this.genders = null;
    this.dataSource = new DependentListDataSource(this.dependentService);
    this.dataSource.loadDependents(setSortingParameters('','asc','FirstName',0,this.itemsPerPage),this.employee.id);
    this.getDependentRelationshipTypes();
    this.getGenders();
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange,this.paginator.page)
    .pipe(
        tap(() => this.loadDependentsPage())
    )
    .subscribe();
  }

  reloadDependents(reload: boolean) {
    if (reload) {this.loadDependentsPage();}
  }

  private getDependentRelationshipTypes() {
    this.lookUpService.getDependentRelationshipTypes().pipe(
        map(response => {
          this.dependentRelationshipTypes = response;
        })
    ).subscribe();
  }

  private getGenders() {
    this.lookUpService.getGenders().pipe(
        map(response => {
          this.genders = response;
        })
    ).subscribe();
  }


  private loadDependentsPage() {
    this.dataSource.loadDependents(setSortingParameters('',
                                                        this.sort.direction,
                                                        this.sort.active,
                                                        this.paginator.pageIndex,
                                                        this.paginator.pageSize),
                                                        this.employee.id);
  }

  public selectDependent(dependent: Dependent) {
    this.dependentOperation = FormActions.Edit;
    this.dependent=dependent;
  }

  public createDependent(employee: Employee) {
    this.dependentOperation = FormActions.Create;
    this.dependent=newDependent(employee.id, employee.lastName);
  }

}
