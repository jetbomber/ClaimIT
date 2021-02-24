import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormActions } from 'src/app/utilities/enum';
import { Employee } from 'src/app/_models/employee';
import { newEmployee } from '../employee-list/employee-common';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Output() reloadEmployees: EventEmitter<boolean> = new EventEmitter();
  employeeOperation: FormActions;
  employee: Employee;
  showCloseButton: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.employeeOperation = FormActions.Create;
    this.employee = newEmployee();
    this.showCloseButton = true;
  }

  closeWindow(close: boolean) {
    if (close) {
      this.cancel();
      this.reloadEmployees.emit(true);
    }
  }

  public cancel() {
    this.modalRef.hide();
  }

}
