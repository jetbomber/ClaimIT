import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeService } from 'src/app/_services/employee.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  public createEmployeeForm: FormGroup;
  validationErrors: string[] = [];
  
  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private msg: PopUpMessageService) { }

  ngOnInit(): void {
    this.createEmployeeForm = this.fb.group({
      lastName: ['', Validators.required]
    })
  }

  public cancel() {
    this.modalRef.hide();
  }

  public createEmployee() {
    this.employeeService.createEmployee(this.createEmployeeForm.value).subscribe(() => {
      this.msg.success('Employee created successfully');
      this.modalRef.hide();
      location.reload();
    }, error => {
      this.validationErrors = error;
    })
  }

}
