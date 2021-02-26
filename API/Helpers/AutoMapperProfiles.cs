using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Division, DivisionDto>();
            CreateMap<Province, ProvinceDto>();
            CreateMap<TaxType, TaxTypeDto>();
            CreateMap<Class, ClassDto>();
            CreateMap<HsaClassDetails, HsaClassDetailsDto>();
            CreateMap<HsaAccountType, HsaAccountTypeDto>();
            CreateMap<Employee, EmployeeDto>();
            CreateMap<Gender, GenderDto>();
            CreateMap<MaritalStatus, MaritalStatusDto>();
            CreateMap<Dependent, DependentDto>();
        }
        
    }
}