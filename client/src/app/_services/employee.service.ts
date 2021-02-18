import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setRequestParameters } from '../utilities/http.utilities';
import { Class } from '../_models/class';
import { Employee } from '../_models/employee';
import { PaginatedResult } from '../_models/pagination';
import { SortProps } from '../_models/sort.props';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Employee[]> = new PaginatedResult<Employee[]>();

  constructor(private http: HttpClient) { }

  getEmployees(sortProps: SortProps) {

    var params = setRequestParameters(sortProps);

    return this.http.get<Employee[]>(this.baseUrl + 'employee', {observe: 'response',params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  getEmployee(employeeId: number) {
    return this.http.get<Employee>(this.baseUrl + 'employee/' + employeeId); 
  }

  updateEmployee(employee: Employee){
    return this.http.put(this.baseUrl + 'employee', employee);
  }

  createEmployee(employee: Employee){
    return this.http.post(this.baseUrl + 'employee', employee);
  }
}
