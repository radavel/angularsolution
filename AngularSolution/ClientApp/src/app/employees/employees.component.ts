import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeList: Employee[] = [];
  employeeToEdit?: Employee;
  showEditEmployee = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList()
  {
      this.employeeService.getAllEmployees().subscribe((results: Employee[]) => this.employeeList = results);
  }

  createEmployee() 
  {
    this.employeeToEdit = new Employee();
  }

  updateEmployee(employee: Employee)
  {
    this.employeeToEdit = employee;
  }

  toggleEditEmployee()
  {
    this.showEditEmployee = !this.showEditEmployee;
  }
}
