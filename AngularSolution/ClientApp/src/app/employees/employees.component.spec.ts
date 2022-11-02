import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeService } from './employee.service';

import { EmployeesComponent } from './employees.component';

let employees: Employee[] = [
  {
    id: 1,
    name: 'Radames',
    lastname: 'Hernandez',
    email: 'rhernandez@coltbuilders.com',
    age: 30,
    position: 'Software Engineer Level 1'
  }
];

class MockEmployeeService {
  getAllEmployees() {
    return {
      subscribe() {
        return employees;
      }
    };
  }
}

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesComponent ],
      providers: [
        EmployeesComponent,
        { 
          provide: EmployeeService, useClass: MockEmployeeService 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('#getEmployeeList() should to get Employee Array', fakeAsync(() => {
    spyOn(employeeService, 'getAllEmployees').and.returnValue(of(employees))
    component.getEmployeeList();
    tick();
    expect(component.employeeList).toEqual(employees);
    expect(component.employeeList.length).toBe(1);
  }))

  it('#createEmployee() should set an empty Employee object into employeeToEdit', () => {
      expect(component.employeeToEdit).toBeUndefined();
      component.createEmployee();
      expect(component.employeeToEdit).toBeInstanceOf(Employee);
  }); 

  it('#updateEmployee() should set an Employee object into employeeToEdit', () => {
      var employee: Employee = {
        id: 1,
        name: 'Radames',
        lastname: 'Hernandez',
        email: 'rhernandez@coltbuilders.com',
        age: 30,
        position: 'Software Engineer Level 1'
      };

      component.updateEmployee(employee);
      expect(component.employeeToEdit?.name).toBe('Radames');
      expect(component.employeeToEdit?.lastname).toBe('Hernandez');
      expect(component.employeeToEdit?.email).toBe('rhernandez@coltbuilders.com');
      expect(component.employeeToEdit?.age).toBe(30);
      expect(component.employeeToEdit?.position).toBe('Software Engineer Level 1');
  }); 

  it ('#createEmployee() should to toggle showEditEmployee to true', () => {
    expect(component.showEditEmployee).toBeFalse();
    component.createEmployee();
    expect(component.showEditEmployee).toBeTrue();
  });

  it ('#updateEmployee() should to toggle showEditEmployee to true', () => {
    expect(component.showEditEmployee).toBeFalse();
    component.createEmployee();
    expect(component.showEditEmployee).toBeTrue();
  });
});