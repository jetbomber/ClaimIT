using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
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
        
    }
}