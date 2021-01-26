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
    public class DivisionController : BaseApiController
    {
        private readonly IDivisionRepository _divisionRepository;
        public DivisionController(IDivisionRepository divisionRepository)
        {
            _divisionRepository = divisionRepository;

        }

        [Route("[action]/{companyId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DivisionDto>>> GetDivisionsForCompany(int companyId,[FromQuery]UserParams userParams)
        {
            var divisions = await _divisionRepository.GetDivisionsAsync(userParams,companyId);

            Response.AddPaginationHeader(divisions.CurrentPage,
                                         divisions.PageSize,
                                         divisions.TotalCount,
                                         divisions.TotalPages);
            return Ok(divisions);
        }

        [HttpGet("{divisionid}")]
        public async Task<ActionResult<DivisionDto>> GetDivsionById(int divisionId)
        {
            return await _divisionRepository.GetDivisionByIdAsync(divisionId);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateDivision(Division division)
        {

            _divisionRepository.Update(division);

            if (await _divisionRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update division");
            
        }

        [HttpPost]
        public async Task<ActionResult<Division>> CreateDivision(Division division)
        {
            
            if (await _divisionRepository.DivisionExists(division.DivisionName, division.CompanyId)) {
                return BadRequest("A Division with the name '" + division.DivisionName + "' already exists for this company");
            } 
            
             _divisionRepository.Add(division);

            if (await _divisionRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add division");
        }
        
    }
}