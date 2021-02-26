using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class DependentController : BaseApiController
    {
        private readonly IDependentRepository _dependentRepository;
        public DependentController(IDependentRepository dependentRepository)
        {
            _dependentRepository = dependentRepository;

        }

        [Route("[action]/{employeeId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DependentDto>>> GetDependentsForEmployee(int employeeId,[FromQuery]UserParams userParams)
        {
            var dependents = await _dependentRepository.GetDependentsAsync(userParams,employeeId);

            Response.AddPaginationHeader(dependents.CurrentPage,
                                         dependents.PageSize,
                                         dependents.TotalCount,
                                         dependents.TotalPages);
            return Ok(dependents);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateDependent(Dependent dependent)
        {

            dependent.Birthdate = ParseDates.ParseDate(dependent.Birthdate);
            _dependentRepository.Update(dependent);

            if (await _dependentRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update dependent");
            
        }

        [HttpPost]
        public async Task<ActionResult<Dependent>> CreateDependent(Dependent dependent)
        {
            
            if (await _dependentRepository.DependentExists(dependent)) {
                return BadRequest("A Dependent with the name '" + dependent.FirstName + ' ' + dependent.LastName + "' already exists for this employee");
            } 
            
            dependent.Birthdate = ParseDates.ParseDate(dependent.Birthdate);
             _dependentRepository.Add(dependent);

            if (await _dependentRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add dependent");
        }
    }
}