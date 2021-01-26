import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utilities/custom.validators';
import { FormActions } from 'src/app/utilities/enum';
import { Class } from 'src/app/_models/class';
import { ClassService } from 'src/app/_services/class.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  @Input() classData: Class;
  @Input() classOperation: FormActions;
  classForm: FormGroup;
  validationErrors: string[] = [];

  @Output() reloadClasses: EventEmitter<boolean> = new EventEmitter();

  constructor(private classService: ClassService,
              private fb: FormBuilder,
              private msg: PopUpMessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName=='classData' && chng.currentValue != null) {
        this.initializeForm(chng.currentValue);
      }
    }
  }

  private initializeForm(classData: Class) {
    this.classForm = this.fb.group({
      id: [classData.id],
      companyId: [classData.companyId],
      classNumber: [classData.classNumber,CustomValidators.isNumeric("classNumber")],
      className: [classData.className,Validators.required],
      description: [classData.description],
      personalHealthMaximum: [classData.personalHealthMaximum,CustomValidators.isNumeric("personalHealthMaximum")],
      classWaitingPeriod: [classData.classWaitingPeriod,CustomValidators.isNumeric("classWaitingPeriod")],
      isHsaClass: [classData.isHsaClass]
    })
  }

  private retrieveFormData() {
    this.classData.classNumber = this.classForm.get('classNumber').value;
    this.classData.className = this.classForm.get('className').value;
    this.classData.description = this.classForm.get('description').value;
    this.classData.personalHealthMaximum = this.classForm.get('personalHealthMaximum').value;
    this.classData.classWaitingPeriod = this.classForm.get('classWaitingPeriod').value;
    this.classData.isHsaClass = this.classForm.get('isHsaClass').value;
  }

  public handleSubmission() {
    if (this.classOperation==FormActions.Edit) {
      this.classService.updateClass(this.classForm.value).subscribe(() => {
        this.retrieveFormData();
        this.msg.success('Class updated successfully');
      }, error => {
        this.msg.error('Class was not updated','Error');
        this.validationErrors = error;
      })
    } else {
      this.retrieveFormData();
      this.classService.createClass(this.classData).subscribe(() => {
        this.classForm.reset();
        this.reloadClasses.emit(true);
        this.msg.success('Class created successfully');
      }, error => {
        this.msg.error('Class was not created','Error');
        this.validationErrors = error;
      })
    }
  }

}
