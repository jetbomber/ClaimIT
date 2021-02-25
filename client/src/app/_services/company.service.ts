import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';
import { PaginatedResult } from '../_models/pagination';
import { setRequestParameters } from '../utilities/http.utilities';
import { SortProps } from '../_models/sort.props';
import { CompanyList } from '../_models/companylist';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Company[]> = new PaginatedResult<Company[]>();

  constructor(private http: HttpClient) { }

  getCompanies(sortProps: SortProps) {

    var params = setRequestParameters(sortProps);

    return this.http.get<Company[]>(this.baseUrl + 'company', {observe: 'response',params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  getCompany(companyId: number) {
    return this.http.get<Company>(this.baseUrl + 'company/' + companyId); 
  }

  getCompanyList() {
    return this.http.get<CompanyList[]>(this.baseUrl + 'company/GetCompanyList'); 
  }

  updateCompany(company: Company){
    return this.http.put(this.baseUrl + 'company', company);
  }

  createCompany(company: Company){
    return this.http.post(this.baseUrl + 'company', company);
  }

}
