import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../employee.service';

import { EditEmployeeComponent } from './edit-employee.component';

class MockEmployeeService {
    createEmployee() {
        return {
            subscribe() {
                return true;
            }
        };
    }
    updateEmployee() {
        return {
            subscribe() {
                return true;
            }
        }
    }
    deleteEmployee() {
        return {
            subscribe() {
                return true;
            }
        }
    }
}

describe('EmployeesComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeComponent ],
      providers: [
        EditEmployeeComponent,
        { 
          provide: EmployeeService, useClass: MockEmployeeService 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('#createEmployee() should to call service and emit flags', fakeAsync(() => {
    let employee: Employee = {
        name: 'Radames',
        lastname: 'Hernandez',
        email: 'rhernandez@coltbuilders.com',
        age: 30,
        position: 'Software Engineer Level 1'
    };

    spyOn(employeeService, 'createEmployee').and.returnValue(of(Boolean));
    spyOn(component.employeeUpdated, 'emit');
    spyOn(component.toggleEditEmployee, 'emit');
    component.createEmployee(employee);
    tick();

    expect(employeeService.createEmployee).toHaveBeenCalled();
    expect(component.employeeUpdated.emit).toHaveBeenCalled();
    expect(component.toggleEditEmployee.emit).toHaveBeenCalled();
  }))

  it('#updateEmployee() should to call service and emit flags', fakeAsync(() => {
    let employee: Employee = {
        id: 1,
        name: 'Radames',
        lastname: 'Hernandez',
        email: 'rhernandez@coltbuilders.com',
        age: 30,
        position: 'Software Engineer Level 1'
    };

    spyOn(employeeService, 'updateEmployee').and.returnValue(of(Boolean));
    spyOn(component.employeeUpdated, 'emit');
    spyOn(component.toggleEditEmployee, 'emit');
    component.updateEmployee(employee);
    tick();

    expect(employeeService.updateEmployee).toHaveBeenCalled();
    expect(component.employeeUpdated.emit).toHaveBeenCalled();
    expect(component.toggleEditEmployee.emit).toHaveBeenCalled();
  }))

  it('#deleteEmployee() should to call service and emit flags', fakeAsync(() => {
    let employee: Employee = {
        id: 1,
        name: 'Radames',
        lastname: 'Hernandez',
        email: 'rhernandez@coltbuilders.com',
        age: 30,
        position: 'Software Engineer Level 1'
    };

    spyOn(employeeService, 'deleteEmployee').and.returnValue(of(Boolean));
    spyOn(component.employeeUpdated, 'emit');
    spyOn(component.toggleEditEmployee, 'emit');
    component.deleteEmployee(employee);
    tick();

    expect(employeeService.deleteEmployee).toHaveBeenCalled();
    expect(component.employeeUpdated.emit).toHaveBeenCalled();
    expect(component.toggleEditEmployee.emit).toHaveBeenCalled();
  }))
});