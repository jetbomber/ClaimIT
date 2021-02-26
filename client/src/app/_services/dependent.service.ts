import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setRequestParameters } from '../utilities/http.utilities';
import { Dependent } from '../_models/dependent';
import { PaginatedResult } from '../_models/pagination';
import { SortProps } from '../_models/sort.props';

@Injectable({
  providedIn: 'root'
})
export class DependentService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Dependent[]> = new PaginatedResult<Dependent[]>();

  constructor(private http: HttpClient) { }

  getDependents(sortProps: SortProps, employeeId: number) {

    var params = setRequestParameters(sortProps);

    return this.http.get<Dependent[]>(this.baseUrl + 'dependent/GetDependentsForEmployee/'+ employeeId, {observe: 'response',params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  getDependent(dependentId: number) {
    return this.http.get<Dependent>(this.baseUrl + 'dependent/' + dependentId); 
  }

  // getDependentListForEmployee(companyId: number) {
  //   return this.http.get<DependentList[]>(this.baseUrl + 'dependent/GetDependentListForEmployee/' + employeeId); 
  // }

  updateDependent(dependent: Dependent){
    return this.http.put(this.baseUrl + 'dependent', dependent);
  }

  createDependent(dependent: Dependent){
    return this.http.post(this.baseUrl + 'dependent', dependent);
  }
}
