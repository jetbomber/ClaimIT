using System.Collections.Generic;
using System.Linq;
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
    public class ClassController : BaseApiController
    {
        private readonly IClassRepository _classRepository;
        private readonly IHsaClassDetailsRepository _hsaClassDetailsRepository;
        public ClassController(IClassRepository classRepository,IHsaClassDetailsRepository hsaClassDetailsRepository)
        {
            _classRepository = classRepository;
            _hsaClassDetailsRepository = hsaClassDetailsRepository;
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

        [Route("[action]/{classId}")]
        [HttpGet]
         public async Task<ActionResult<HsaClassDetailsDto>> GetHsaClassDetailsByClassId(int classId)
        {
            return await _hsaClassDetailsRepository.GetHsaClassDetailsByClassIdAsync(classId);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateClass(ClassDto classDto)
        {

            _classRepository.Update(getClassData(classDto));
            _hsaClassDetailsRepository.Update(GetHsaClassDetails(classDto.HsaClassDetails));

            if (await _classRepository.SaveAllAsync() && await _hsaClassDetailsRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update class");
            
        }

        private HsaClassDetails GetHsaClassDetails(ICollection<HsaClassDetailsDto> HsaClassDetails) {
            HsaClassDetails hsaClassDetails = new HsaClassDetails();
            hsaClassDetails.Id = HsaClassDetails.ElementAt(0).Id;
            hsaClassDetails.ExcludeDental = HsaClassDetails.ElementAt(0).ExcludeDental;
            hsaClassDetails.ExcludeDrug = HsaClassDetails.ElementAt(0).ExcludeDrug;
            hsaClassDetails.ExcludeExtendedHealth = HsaClassDetails.ElementAt(0).ExcludeExtendedHealth;
            hsaClassDetails.ExcludeVision = HsaClassDetails.ElementAt(0).ExcludeVision;
            hsaClassDetails.HsaAccountTypeId = HsaClassDetails.ElementAt(0).HsaAccountTypeId;
            hsaClassDetails.CarryForwardYears = HsaClassDetails.ElementAt(0).CarryForwardYears;
            hsaClassDetails.ClassId = HsaClassDetails.ElementAt(0).ClassId;
            return hsaClassDetails;
        }

        private Class getClassData(ClassDto classDto) {
            Class classData = new Class();
            classData.Id = classDto.Id;
            classData.ClassName = classDto.ClassName;
            classData.ClassNumber = classDto.ClassNumber;
            classData.ClassWaitingPeriod = classDto.ClassWaitingPeriod;
            classData.Description = classDto.Description;
            classData.PersonalHealthMaximum = classDto.PersonalHealthMaximum;
            classData.IsHsaClass = classDto.IsHsaClass;
            classData.CompanyId = classDto.CompanyId;
            return classData;
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