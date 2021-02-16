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
     
    }
}