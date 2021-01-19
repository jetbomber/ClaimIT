import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setRequestParameters } from '../utilities/http.utilities';
import { Division } from '../_models/division';
import { PaginatedResult } from '../_models/pagination';
import { SortProps } from '../_models/sort.props';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Division[]> = new PaginatedResult<Division[]>();

  constructor(private http: HttpClient) { }

  getDivisions(sortProps: SortProps, companyId: number) {

    var params = setRequestParameters(sortProps);

    return this.http.get<Division[]>(this.baseUrl + 'division/GetDivisionsForCompany/'+ companyId, {observe: 'response',params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  getDivision(divisionId: number) {
    return this.http.get<Division>(this.baseUrl + 'division/' + divisionId); 
  }

  updateDivision(division: Division){
    return this.http.put(this.baseUrl + 'division', division);
  }

  createDivision(division: Division){
    return this.http.post(this.baseUrl + 'division', division);
  }
}
