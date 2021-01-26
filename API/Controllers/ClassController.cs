using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ClassController : BaseApiController
    {
          private readonly IClassRepository _classRepository;
        public ClassController(IClassRepository classRepository)
        {
            _classRepository = classRepository;

        }

        [Route("[action]/{companyId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClassesForCompany(int companyId,[FromQuery]UserParams userParams)
        {
            var classes = await _classRepository.GetClassesAsync(userParams,companyId);

            Response.AddPaginationHeader(classes.CurrentPage,
                                         classes.PageSize,
                                         classes.TotalCount,
                                         classes.TotalPages);
            return Ok(classes);
        }

        [HttpGet("{classid}")]
        public async Task<ActionResult<Class>> GetClassById(int classId)
        {
            return await _classRepository.GetClassByIdAsync(classId);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateClass(Class classData)
        {

            _classRepository.Update(classData);

            if (await _classRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update class");
            
        }

        [HttpPost]
        public async Task<ActionResult<Class>> CreateClass(Class classData)
        {
            
            if (await _classRepository.ClassExists(classData.ClassName, classData.CompanyId)) {
                return BadRequest("A Class with the name '" + classData.ClassName + "' already exists for this company");
            } 
            
             _classRepository.Add(classData);

            if (await _classRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to add class");
        }
        
    }
        
}