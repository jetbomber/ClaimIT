import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utilities/custom.validators';
import { FormActions } from 'src/app/utilities/enum';
import { Class } from 'src/app/_models/class';
import { HsaAccountTypes } from 'src/app/_models/hsaaccounttypes';
import { ClassService } from 'src/app/_services/class.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';
import { newClass } from '../class-list/class-common';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  @Input() classData: Class;
  @Input() classOperation: FormActions;
  @Input() hsaAccountTypes: HsaAccountTypes[]
  classForm: FormGroup;
  validationErrors: string[] = [];
  hsaAccountTypesList = [];

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
        this.validationErrors = [];
      } else if (propName=='hsaAccountTypes' && chng.currentValue != null) {
        this.hsaAccountTypes = chng.currentValue;
      } 
    }
  }

  private initializeForm(classData: Class) {
    let carryForwardYears = null;
    let hsaAccountTypeId = null;
    let excludeDental = false;
    let excludeDrug = false;
    let excludeExtendedHealth = false;
    let excludeVision = false;
    if (classData.hsaClassDetails.length > 0) { 
      carryForwardYears = classData.hsaClassDetails[0].carryForwardYears; 
      excludeDental = classData.hsaClassDetails[0].excludeDental;
      excludeDrug = classData.hsaClassDetails[0].excludeDrug
      excludeExtendedHealth = classData.hsaClassDetails[0].excludeExtendedHealth;
      excludeVision = classData.hsaClassDetails[0].excludeVision;
      hsaAccountTypeId = classData.hsaClassDetails[0].hsaAccountTypeId; 
    }
    this.classForm = this.fb.group({
      //id: [classData.id],
      //companyId: [classData.companyId],
      classNumber: [classData.classNumber,CustomValidators.isNumeric("classNumber")],
      className: [classData.className,Validators.required],
      description: [classData.description],
      personalHealthMaximum: [classData.personalHealthMaximum,CustomValidators.isNumeric("personalHealthMaximum")],
      classWaitingPeriod: [classData.classWaitingPeriod,CustomValidators.isNumeric("classWaitingPeriod")],
      isHsaClass: [classData.isHsaClass],
      carryForwardYears: [carryForwardYears,CustomValidators.isNumeric("carryForwardYears")],
      hsaAccountTypeId: [hsaAccountTypeId,Validators.required],
      excludeDental: [excludeDental],
      excludeDrug: [excludeDrug],
      excludeExtendedHealth: [excludeExtendedHealth],
      excludeVision: [excludeVision]
    })
    this.hsaAccountTypesList = this.hsaAccountTypes;
  }

  private retrieveFormData() {
    //this.classData.id = this.classForm.get("id").value;
    //this.classData.companyId = this.classForm.get("companyId").value;
    this.classData.classNumber = this.classForm.get("classNumber").value;
    this.classData.className = this.classForm.get("className").value;
    this.classData.description = this.classForm.get("description").value;
    this.classData.personalHealthMaximum = this.classForm.get("personalHealthMaximum").value;
    this.classData.classWaitingPeriod = this.classForm.get("classWaitingPeriod").value;
    this.classData.isHsaClass = this.classForm.get("isHsaClass").value;
    this.classData.hsaClassDetails[0].carryForwardYears = this.classForm.get("carryForwardYears").value;
    this.classData.hsaClassDetails[0].hsaAccountTypeId = this.classForm.get("hsaAccountTypeId").value;
    this.classData.hsaClassDetails[0].excludeDental = this.classForm.get("excludeDental").value;
    this.classData.hsaClassDetails[0].excludeDrug = this.classForm.get("excludeDrug").value;
    this.classData.hsaClassDetails[0].excludeExtendedHealth = this.classForm.get("excludeExtendedHealth").value;
    this.classData.hsaClassDetails[0].excludeVision = this.classForm.get("excludeVision").value;
  }

  public handleSubmission() {
    if (this.classOperation==FormActions.Edit) {
      this.retrieveFormData();
      this.classService.updateClass(this.classData).subscribe(() => {
        this.reloadClasses.emit(true);
        this.msg.success('Class updated successfully');
      }, error => {
        this.msg.error('Class was not updated','Error');
        this.validationErrors = error;
      })
    } else {
      this.classForm.removeControl("id");
      this.classService.createClass(this.classForm.value).subscribe(() => {
        this.reloadClasses.emit(true);
        this.initializeForm(newClass(this.classData.companyId));
        this.msg.success('Class created successfully');
      }, error => {
        this.msg.error('Class was not created','Error');
        this.validationErrors = error;
      })
    }
  }

}
