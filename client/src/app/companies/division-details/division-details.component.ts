import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "src/app/utilities/custom.validators";
import { FormActions } from "src/app/utilities/enum";
import { Division } from "src/app/_models/division";
import { FederalTax } from "src/app/_models/federaltax";
import { Province } from "src/app/_models/province";
import { DivisionService } from "src/app/_services/division.service";
import { PopUpMessageService } from "src/app/_services/pop-up-message.service";
import { newDivision } from "../division-list/division-common";

@Component({
  selector: 'app-division-details',
  templateUrl: './division-details.component.html',
  styleUrls: ['./division-details.component.css']
})

export class DivisionDetailsComponent implements OnInit {
  @Input() division: Division
  @Input() provinces: Province[];
  @Input() federalTaxes: FederalTax[];
  @Input() divisionOperation: FormActions;
  provinceList = [];
  divisionForm: FormGroup;
  taxFeePercentage: number;
  provincialTaxType: string = null;
  validationErrors: string[] = [];

  @Output() reloadDivisions: EventEmitter<boolean> = new EventEmitter();

  constructor(private divisionService: DivisionService,
              private fb: FormBuilder,
              private msg: PopUpMessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      if (propName=='division' && chng.currentValue != null) {
        this.initializeForm(chng.currentValue);
      } else if (propName=='provinces' && chng.currentValue != null) {
        this.provinces = chng.currentValue;
      }  else if (propName=='federalTaxes' && chng.currentValue != null) {
        this.federalTaxes = chng.currentValue;
      }
    }
  }

  private getTaxInfo(provinceId: number) {
    if (!provinceId) {provinceId=1;}
    const provincialData = this.provinces.find(x=>x.id == provinceId);
    this.provincialTaxType = provincialData.taxTypeName; 
    this.taxFeePercentage = provincialData.taxPercentage;
  }

  public updateFees(provinceId: number) {
    this.getTaxInfo(provinceId);
  }

  private initializeForm(division: Division) {
    if (this.divisionOperation == FormActions.Edit)
    {
      this.getTaxInfo(division.provinceId);
    }
    
    this.divisionForm = this.fb.group({
      id: [this.division.id],
      companyId: [this.division.companyId],
      divisionNumber: [division.divisionNumber,CustomValidators.isNumeric("divisionNumber")],
      divisionName: [division.divisionName,Validators.required],
      generalAdminFee: [division.generalAdminFee,CustomValidators.isNumeric("generalAdminFee")],
      address:[division.address,Validators.required],
      city:[division.city,Validators.required],
      provinceId:[division.provinceId,Validators.required],
      postalCode:[division.postalCode,CustomValidators.postalCode("postalCode")],
      contactPersonName: [division.contactPersonName,Validators.required],
      contactPersonPhoneNumber: [division.contactPersonPhoneNumber,CustomValidators.phoneNumber("contactPersonPhoneNumber")],
      contactPersonPhoneNumberExt: [division.contactPersonPhoneNumberExt],
      contactPersonEmailAddress: [division.contactPersonEmailAddress,Validators.email],
      contactPersonFax: [division.contactPersonFax,CustomValidators.phoneNumber("contactPersonFax")]
    })
    this.provinceList=this.provinces;
    this.divisionForm.get("provinceId").valueChanges
    .subscribe(provinceId=> {
      this.updateFees(provinceId);
      division.provinceId = provinceId;
    })
  }

  public handleSubmission() {
    if (this.divisionOperation==FormActions.Edit) {
      this.divisionService.updateDivision(this.divisionForm.value).subscribe(() => {
        this.reloadDivisions.emit(true);
        this.msg.success('Division updated successfully');
      }, error => {
        this.validationErrors = error;
      })
    } else {
      this.divisionForm.removeControl("id");
      this.divisionService.createDivision(this.divisionForm.value).subscribe(() => {
        this.reloadDivisions.emit(true);
        this.initializeForm(newDivision(this.division.companyId));
        this.msg.success('Division created successfully');
      }, error => {
        this.validationErrors = error;
      })
    }
  }

}
