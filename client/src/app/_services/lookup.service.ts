import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompensationType } from '../_models/compensationtypes';
import { DependentRelationshipType } from '../_models/dependentrelationshiptypes';
import { FederalTax } from '../_models/federaltax';
import { Gender } from '../_models/gender';
import { HsaAccountTypes } from '../_models/hsaaccounttypes';
import { MaritalStatus } from '../_models/maritalstatus';
import { Province } from '../_models/province';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get<Province[]>(this.baseUrl + 'lookup/GetProvinces'); 
  }

  getFederalTaxes() {
    return this.http.get<FederalTax[]>(this.baseUrl + 'lookup/GetFederalTaxes'); 
  }
  
  getHsaAccountTypes() {
    return this.http.get<HsaAccountTypes[]>(this.baseUrl + 'lookup/GetHsaAccountTypes'); 
  }

  getGenders() {
    return this.http.get<Gender[]>(this.baseUrl + 'lookup/GetGenders'); 
  }
  getMaritalStatuses() {
    return this.http.get<MaritalStatus[]>(this.baseUrl + 'lookup/GetMaritalStatuses'); 
  }

  getCompensationTypes() {
    return this.http.get<CompensationType[]>(this.baseUrl + 'lookup/GetCompensationTypes'); 
  }

  getDependentRelationshipTypes() {
    return this.http.get<DependentRelationshipType[]>(this.baseUrl + 'lookup/GetDependentRelationshipTypes'); 
  }

  createPDF() {
    return this.http.get(this.baseUrl + 'pdf');
  }
}
