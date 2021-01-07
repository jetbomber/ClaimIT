using System;
using System.Collections.Generic;
using System.Security.Claims;
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
    public class CompanyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly ICompanyRepository _companyRepository;
        public CompanyController(ICompanyRepository companyRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies([FromQuery]UserParams userParams)
        {
            var companies = await _companyRepository.GetCompaniesAsync(userParams);

            Response.AddPaginationHeader(companies.CurrentPage,
                                         companies.PageSize,
                                         companies.TotalCount,
                                         companies.TotalPages);
            return Ok(companies);
        }

        [HttpGet("{companyid}")]
        public async Task<ActionResult<Company>> GetCompanyById(int companyId)
        {
            return await _companyRepository.GetCompanyByIdAsync(companyId);
        }

        [HttpPost]
        public async Task<ActionResult<Company>> CreateCompany(Company company)
        {
            return Ok("Create Company");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCompany(Company company)
        {

            company.CommencementDate = ParseDates.ParseDate(company.CommencementDate);
            company.YearEndDate = ParseDates.ParseDate(company.YearEndDate);
            company.GroupTerminationDate = ParseDates.ParseDate(company.GroupTerminationDate);
            _companyRepository.Update(company);

            if (await _companyRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update company");
            
        }


    }
}