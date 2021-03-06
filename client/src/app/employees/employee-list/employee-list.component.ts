import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constants';
import { FormActions } from 'src/app/utilities/enum';
import { setSortingParameters } from 'src/app/utilities/sort.utilities';
import { Employee } from 'src/app/_models/employee';
import { Province } from 'src/app/_models/province';
import { EmployeeService } from 'src/app/_services/employee.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { EmployeeListDataSource } from './employee-list-data-source';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() companyId: number;
  modalRef: BsModalRef;
  employee:Employee;
  provinces: Province[];
  filterByOptions: any[];
  filterBy: string;
  config: ModalOptions;
  dataSource: EmployeeListDataSource;
  itemsPerPage = Constants.ItemsPerPage;
  pageSizeOptions = Constants.PageSizeOptions;
  displayColumns = ["Id","EmployeeNumber","FirstName","LastName","City","ProvinceName","CompanyName"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private employeeService: EmployeeService, 
              private lookUpService: LookupService,
              private modalService: BsModalService,
              private router: Router) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.employee = null;
    this.provinces = null;
    this.dataSource = new EmployeeListDataSource(this.employeeService);
    this.dataSource.loadEmployees(setSortingParameters('','asc','LastName',0,this.itemsPerPage));
    this.populatefilterByOptions()
    this.getProvinces();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadEmployeesPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange,this.paginator.page)
    .pipe(
        tap(() => this.loadEmployeesPage())
    )
    .subscribe();
  }

  populatefilterByOptions() {
    this.filterByOptions = [
      { name: 'Company' },
      { name: 'Last Name' },
      { name: 'First Name' }
    ];
  }

  reloadEmployees(reload: boolean) {
    if (reload) {this.loadEmployeesPage();}
  }

  private getProvinces() {
    this.lookUpService.getProvinces().pipe(
        map(response => {
          this.provinces = response;
        })
    ).subscribe();
  }

  private loadEmployeesPage() {
    this.dataSource.loadEmployees(setSortingParameters(this.input.nativeElement.value,
                                                       this.sort.direction,
                                                       this.sort.active,
                                                       this.paginator.pageIndex,
                                                       this.paginator.pageSize,
                                                       this.filterBy));
  }

  public selectEmployee(employee: Employee) {
    this.router.navigateByUrl('/employees/'+ employee.id);
  }

}



