import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormActions } from 'src/app/utilities/enum';
import { Dependent } from 'src/app/_models/dependent';
import { DependentRelationshipType } from 'src/app/_models/dependentrelationshiptypes';
import { Gender } from 'src/app/_models/gender';
import { DependentService } from 'src/app/_services/dependent.service';
import { PopUpMessageService } from 'src/app/_services/pop-up-message.service';
import { newDependent } from '../dependent-list/dependent-common';

@Component({
  selector: 'app-dependent-details',
  templateUrl: './dependent-details.component.html',
  styleUrls: ['./dependent-details.component.css']
})
export class DependentDetailsComponent implements OnInit {
  @Input() dependentOperation: FormActions;
  @Input() dependent: Dependent;
  @Input() dependentRelationshipTypes: DependentRelationshipType[];
  @Input() genders: Gender[];
  dependentForm: FormGroup;
  validationErrors: string[] = [];

  @Output() reloadDependents: EventEmitter<boolean> = new EventEmitter();

  constructor(private dependentService: DependentService,
              private fb: FormBuilder,
              private msg: PopUpMessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName=='dependent' && chng.currentValue != null) {
        this.initializeForm(chng.currentValue);
      } else if (propName=='dependentRelationshipTypes' && chng.currentValue != null) {
        this.dependentRelationshipTypes = chng.currentValue;
      }  else if (propName=='genders' && chng.currentValue != null) {
        this.genders = chng.currentValue;
      }
    }
  }

  private initializeForm(dependent: Dependent) {
    this.dependentForm = this.fb.group({
      id: [dependent.id],
      employeeId:[dependent.employeeId],
      firstName: [dependent.firstName,Validators.required],
      lastName: [dependent.lastName,Validators.required],
      birthDate: [dependent.birthDate==null?null:new Date(dependent.birthDate), Validators.required],
      genderId:[dependent.genderId,Validators.required],
      dependentRelationshipTypeId:[dependent.dependentRelationshipTypeId,Validators.required]
    })
  }

  public handleSubmission() {
    if (this.dependentOperation==FormActions.Edit) {
      this.dependentService.updateDependent(this.dependentForm.value).subscribe(() => {
        this.reloadDependents.emit(true);
        this.msg.success('Dependent updated successfully');
      }, error => {
        this.validationErrors = error;
      })
    } else {
      this.dependentForm.removeControl("id");
      this.dependentService.createDependent(this.dependentForm.value).subscribe(() => {
        this.reloadDependents.emit(true);
        this.initializeForm(newDependent(this.dependent.employeeId, this.dependent.lastName));
        this.msg.success('Dependent created successfully');
      }, error => {
        this.validationErrors = error;
      })
    }
  }

}
