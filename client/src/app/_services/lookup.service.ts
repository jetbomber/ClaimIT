import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FederalTax } from '../_models/federaltax';
import { HsaAccountTypes } from '../_models/hsaaccounttypes';
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
}
