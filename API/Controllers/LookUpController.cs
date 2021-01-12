using System.Collections.Generic;
using System.Threading.Tasks;
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
        [HttpGet("{provinces}")]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            var provinces = await _lookUpRepository.GetProvincesAsync();

            return Ok(provinces);
        }
    }
}