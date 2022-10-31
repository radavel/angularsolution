using Microsoft.AspNetCore.Mvc;
using AngularSolution.Services;
using AngularSolution.Models;

namespace AngularSolution.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            return Ok(await _service.GetAllEmployees());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            var employee = await _service.GetEmployeeById(id);
            if (employee is null)
            {
                throw new InvalidOperationException("Employee does not exists");
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            if (employee is null)
            {
                throw new InvalidOperationException("Employee needs to be an object");
            }

            return Ok(await _service.AddEmployee(employee));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(Employee employee)
        {
            var employeeToUpdate = await _service.GetEmployeeById(employee.Id);
            if (employee is null)
            {
                throw new InvalidOperationException("Employee does not exists");
            }

            await _service.UpdateEmployee(employee);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _service.GetEmployeeById(id);
            if (employee is null)
            {
                throw new InvalidOperationException("Employee does not exists");
            }

            await _service.DeleteEmployee(employee.Id);
            return Ok();
        }
    }
}

