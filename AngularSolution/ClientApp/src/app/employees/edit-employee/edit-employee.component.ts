import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
})
export class EditEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Input() show = false;
  @Output() employeeUpdated = new EventEmitter();
  @Output() toggleEditEmployee = new EventEmitter();


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  createEmployee(employee: Employee)
  {
    this.employeeService.createEmployee(employee).subscribe(() => {
      this.employeeUpdated.emit();
      this.toggleEditEmployee.emit();
    });
  }

  updateEmployee(employee: Employee)
  {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.employeeUpdated.emit();
      this.toggleEditEmployee.emit();
    });

  }

  deleteEmployee(employee: Employee)
  {
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.employeeUpdated.emit();
      this.toggleEditEmployee.emit();
    });

  }

}
