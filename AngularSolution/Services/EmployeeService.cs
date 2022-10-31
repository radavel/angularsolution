using AngularSolution.Data;
using AngularSolution.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularSolution.Services
{
    public class EmployeeService
    {
        private readonly DatabaseContext _context;
        private int nextId = 1;

        public EmployeeService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _context.employees.AsNoTracking().OrderBy((employee) => employee.Id).ToListAsync();
        }

        public async Task<Employee?> GetEmployeeById(int id)
        {
            return await _context.employees.FirstOrDefaultAsync(employee => employee.Id == id);
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
            var lastEmployee = await _context.employees.OrderBy(employee => employee.Id).LastOrDefaultAsync();
            if (lastEmployee is not null)
            {
                nextId = lastEmployee.Id + 1;
            }

            employee.Id = nextId;
            await _context.employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task UpdateEmployee(Employee employee)
        {
            var employeeToUpdate = await _context.employees.FindAsync(employee.Id);
            if (employeeToUpdate is null) return;

            employeeToUpdate.Name = employee.Name;
            employeeToUpdate.Lastname = employee.Lastname;
            employeeToUpdate.Email = employee.Email;
            employeeToUpdate.Age = employee.Age;
            employeeToUpdate.Position = employee.Position;
            _context.employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _context.employees.FindAsync(id);
            if (employee is null) return;

            _context.employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}

