import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setRequestParameters } from '../utilities/http.utilities';
import { Class } from '../_models/class';
import { ClassList } from '../_models/classlist';
import { PaginatedResult } from '../_models/pagination';
import { SortProps } from '../_models/sort.props';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Class[]> = new PaginatedResult<Class[]>();

  constructor(private http: HttpClient) { }

  getClasses(sortProps: SortProps, companyId: number) {

    var params = setRequestParameters(sortProps);

    return this.http.get<Class[]>(this.baseUrl + 'class/GetClassesForCompany/'+ companyId, {observe: 'response',params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  getClass(classId: number) {
    return this.http.get<Class>(this.baseUrl + 'class/' + classId); 
  }

  getClassListForCompany(companyId: number) {
    return this.http.get<ClassList[]>(this.baseUrl + 'class/GetClassListForCompany/' + companyId); 
  }

  updateClass(classData: Class){
    return this.http.put<number>(this.baseUrl + 'class', classData);
  }

  createClass(classData: Class){
    return this.http.post(this.baseUrl + 'class', classData);
  }
}
