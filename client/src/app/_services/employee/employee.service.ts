import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
public API = '//localhost:8080';
  public employees_API = this.API + '/employees';

  public emp_API = this.API + '/api/employee/';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<EmployeeService[]> {
    return this.http.get(this.employees_API).pipe(
        map((result: any) => {
           console.log(result._embedded.employees);
           return result._embedded.employees;
        }));
  }

  get(id: string) {
    return this.http.get(this.employees_API + '/' + id);
  }

  edit(employee, form) {
    let result: Observable<Object>;
    console.log(form);
    result = this.http.put(employee._links.self.href, form);
    return result;
  }

  save(employee: any): Observable<any> {
    let result: Observable<Object>;
      result = this.http.post(this.emp_API, employee);
    return result;
  }

  remove(emp) {
    return this.http.delete(emp);
  }

}
