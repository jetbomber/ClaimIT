import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Constants } from "src/app/utilities/constants";
import { CustomValidators } from "src/app/utilities/custom.validators";
import { FormActions } from "src/app/utilities/enum";
import { Division } from "src/app/_models/division";
import { FederalTax } from "src/app/_models/federaltax";
import { Province } from "src/app/_models/province";
import { TaxFee } from "src/app/_models/taxfee";
import { DivisionService } from "src/app/_services/division.service";

@Component({
  selector: 'app-division-details',
  templateUrl: './division-details.component.html',
  styleUrls: ['./division-details.component.css']
})

export class DivisionDetailsComponent implements OnInit {
  @Input() division: Division
  @Input() provinces: Province[];
  @Input() federalTaxes: FederalTax[];
  @Input()  divisionOperation: FormActions;
  provinceList = [];
  divisionForm: FormGroup;
  taxFeePercentage: number;
  provincialTaxType: string = null;
  validationErrors: string[] = [];
  taxFees: TaxFee[] = [];

  constructor(private divisionService: DivisionService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

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
    const provincialData = this.provinces.find(x=>x.id === provinceId);
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
      divisionNumber: [division.divisionNumber,Validators.required],
      divisionName: [division.divisionName,Validators.required],
      generalAdminFee: [division.generalAdminFee,Validators.required],
      address:[division.address,Validators.required],
      city:[division.city,Validators.required],
      province: [division.provinceId,Validators.required],
      postalCode:[division.postalCode,CustomValidators.postalCode("postalCode")],
      contactPersonName: [division.contactPersonName,Validators.required],
      contactPersonPhoneNumber: [division.contactPersonPhoneNumber,CustomValidators.phoneNumber("contactPersonPhoneNumber")],
      contactPersonPhoneNumberExt: [division.contactPersonPhoneNumberExt],
      contactPersonEmailAddress: [division.contactPersonEmailAddress,Validators.email],
      contactPersonFax: [division.contactPersonFax,CustomValidators.phoneNumber("contactPersonFax")]
    })
    this.provinceList=this.provinces;
    this.divisionForm.get("province").valueChanges
    .subscribe(provinceId=> {
      this.updateFees(provinceId);
    })
  }

  public handleSubmission() {
    this.division.divisionNumber = this.divisionForm.get('divisionNumber').value;
    this.division.divisionName = this.divisionForm.get('divisionName').value;
    this.division.generalAdminFee = this.divisionForm.get('generalAdminFee').value;
    this.division.address = this.divisionForm.get('address').value;
    this.division.city = this.divisionForm.get('city').value;
    this.division.provinceId = this.divisionForm.get('province').value;
    this.division.postalCode = this.divisionForm.get('postalCode').value;
    this.division.contactPersonName = this.divisionForm.get('contactPersonName').value;
    this.division.contactPersonPhoneNumber = this.divisionForm.get('contactPersonPhoneNumber').value;
    this.division.contactPersonPhoneNumberExt = this.divisionForm.get('contactPersonPhoneNumberExt').value;
    this.division.contactPersonEmailAddress = this.divisionForm.get('contactPersonEmailAddress').value;
    this.division.contactPersonFax = this.divisionForm.get('contactPersonFax').value;
    if (this.divisionOperation==FormActions.Edit) {
      this.divisionService.updateDivision(this.division).subscribe(() => {
        this.toastr.success('Division updated successfully');
        location.reload();
      }, error => {
        this.validationErrors = error;
      })
    } else {
      this.divisionService.createDivision(this.division).subscribe(() => {
        this.toastr.success('Division created successfully');
        location.reload();
      }, error => {
        this.validationErrors = error;
      })
    }
  }

}
