using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Entities;
using API.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using API.Helpers;
using API.Extensions;
using API.DTOs;

namespace API.Controllers
{
    [Authorize]
    public class EmployeeController : BaseApiController
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees([FromQuery]UserParams userParams)
        {
            var employees = await _employeeRepository.GetEmployeesAsync(userParams);

            Response.AddPaginationHeader(employees.CurrentPage,
                                         employees.PageSize,
                                         employees.TotalCount,
                                         employees.TotalPages);
            return Ok(employees);
        }

        [HttpGet("{employeeid}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployeeById(int employeeId)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(employeeId);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee(Employee employee)
        {

            employee.EligibilityDate = ParseDates.ParseDate(employee.EligibilityDate);
            employee.StartDate = ParseDates.ParseDate(employee.StartDate);
            employee.TerminationDate= ParseDates.ParseDate(employee.TerminationDate);
            employee.HireDate = ParseDates.ParseDate(employee.HireDate);
            _employeeRepository.Update(employee);

            if (await _employeeRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update employee");
            
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            
            if (await _employeeRepository.EmployeeExists(employee.SIN)) {
                return BadRequest("Employee already exists");
            } 
            
            employee.EligibilityDate = ParseDates.ParseDate(employee.EligibilityDate);
            employee.StartDate = ParseDates.ParseDate(employee.StartDate);
            employee.TerminationDate= ParseDates.ParseDate(employee.TerminationDate);
            employee.HireDate = ParseDates.ParseDate(employee.HireDate);
            _employeeRepository.Add(employee);

            if (await _employeeRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add Employee");
        }
     
    }
}