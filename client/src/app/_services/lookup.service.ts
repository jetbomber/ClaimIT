import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FederalTax } from '../_models/federaltax';
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
}
