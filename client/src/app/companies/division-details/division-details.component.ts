import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Division } from "src/app/_models/division";
import { FederalTax } from "src/app/_models/federaltax";
import { Province } from "src/app/_models/province";
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
  provinceList = [];
  divisionForm: FormGroup;
  taxFeePercentage: number;
  provincialTaxType: string;

  constructor(private divisionService: DivisionService,
              private fb: FormBuilder) { }

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

  private getProvincialTaxInfo(provinceId: number) {
    const provincialData = this.provinces.find(x=>x.id === provinceId)
    this.taxFeePercentage = provincialData.taxPercentage;
    this.provincialTaxType = provincialData.taxTypeName;
  }

  private initializeForm(division: Division) {
    this.getProvincialTaxInfo(division.provinceId);
    this.divisionForm = this.fb.group({
      divisionNumber: [division.divisionNumber],
      divisionName: [division.divisionName],
      generalAdminFee: [division.generalAdminFee],
      address:[division.address],
      city:[division.city],
      province: [division.provinceId],
      postalCode:[division.postalCode],
      contactPersonName: [division.contactPersonName],
      contactPersonPhoneNumber: [division.contactPersonPhoneNumber],
      contactPersonPhoneNumberExt: [division.contactPersonPhoneNumberExt],
      contactPersonEmailAddress: [division.contactPersonEmailAddress],
      contactPersonFax: [division.contactPersonFax]
    })
    this.provinceList=this.provinces;
  }

  public updateDivision() {
  }

}
