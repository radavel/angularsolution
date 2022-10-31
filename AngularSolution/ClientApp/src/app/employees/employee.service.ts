import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url = "Employee"

  constructor(private httpClient: HttpClient) { }

  public getAllEmployees() : Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getEmployeeById(id: number) : Observable<Employee>
  {
    return this.httpClient.get<Employee>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public createEmployee(employee: Employee)
  {
    return this.httpClient.post(`${environment.apiUrl}/${this.url}`, employee);
  }

  public updateEmployee(employee: Employee)
  {
    return this.httpClient.put(`${environment.apiUrl}/${this.url}`, employee);
  }

  public deleteEmployee(employee: Employee)
  {
    return this.httpClient.delete(`${environment.apiUrl}/${this.url}/${employee.id}`);
  }
}
