using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
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
        public async Task<ActionResult<IEnumerable<CompanyDto>>> GetCompanies([FromQuery]UserParams userParams)
        {
            var companies = await _companyRepository.GetCompaniesAsync(userParams);

            Response.AddPaginationHeader(companies.CurrentPage,
                                         companies.PageSize,
                                         companies.TotalCount,
                                         companies.TotalPages);
            return Ok(companies);
        }

        [HttpGet("{companyid}")]
        public async Task<ActionResult<CompanyDto>> GetCompanyById(int companyId)
        {
            return await _companyRepository.GetCompanyByIdAsync(companyId);
        }

    }
}