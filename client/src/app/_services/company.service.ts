import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Company[]> = new PaginatedResult<Company[]>();

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  //   })
  // }

  constructor(private http: HttpClient) { }

  getCompanies(filter: string, sortDirection: string, page?: number, itemsPerPage?: number) {

    let params = new HttpParams();

    if (page != null && itemsPerPage !== null)
    {
      params = params.append('filter',filter);
      params = params.append('sortDirection',sortDirection);
      params = params.append('pageNumber',page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Company[]>(this.baseUrl + 'company', {observe: 'response', params}).pipe(
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

}
