using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LookUpController : BaseApiController
    {
        private readonly ILookUpRepository _lookUpRepository;
        public LookUpController(ILookUpRepository lookUpRepository)
        {
            _lookUpRepository = lookUpRepository;

        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProvinceDto>>> GetProvinces()
        {
            var provinces = await _lookUpRepository.GetProvincesAsync();

            return Ok(provinces);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxType>>> GetTaxTypes()
        {
            var taxtypes = await _lookUpRepository.GetTaxTypesAsync();

            return Ok(taxtypes);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FederalTaxDto>>> GetFederalTaxes()
        {
            var federalTaxes = await _lookUpRepository.GetFederalTaxesAsync();

            return Ok(federalTaxes);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HsaAccountTypeDto>>> GetHsaAccountTypes()
        {
            var hsaAccountTypes = await _lookUpRepository.GetHsaAccountTypes();

            return Ok(hsaAccountTypes);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenderDto>>> GetGenders()
        {
            var genders = await _lookUpRepository.GetGendersAsync();

            return Ok(genders);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaritalStatusDto>>> GetMaritalStatuses()
        {
            var maritalStatuses = await _lookUpRepository.GetMaritalStatusesAsync();

            return Ok(maritalStatuses);
        }
    }
}