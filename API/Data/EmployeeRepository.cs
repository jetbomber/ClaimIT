using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmployeeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public bool Add(Employee employee)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> EmployeeExists(string SIN, int companyId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<EmployeeDto> GetEmployeeByIdAsync(int employeeId)
        {
            var query = _context.Employee
            .Where(x => x.Id == employeeId)
            .Join(_context.Company,
                emp=>emp.CompanyId,
                comp=>comp.Id,
                (emp,comp) => new { Comp = comp, Emp = emp })
            .Select(dtoData => new EmployeeDto {
                Id = dtoData.Emp.Id,
                SIN = dtoData.Emp.SIN,
                FirstName = dtoData.Emp.FirstName,
                LastName = dtoData.Emp.LastName,
                MiddleName = dtoData.Emp.MiddleName, 
                BirthDate = dtoData.Emp.Birthdate,  
                Address = dtoData.Emp.Address,
                City = dtoData.Emp.City,
                PostalCode = dtoData.Emp.PostalCode,
                PhoneNumber = dtoData.Emp.PhoneNumber,
                EmailAddress = dtoData.Emp.EmailAddress, 
                EligibilityDate = dtoData.Emp.EligibilityDate,  
                HireDate = dtoData.Emp.HireDate,  
                StartDate = dtoData.Emp.StartDate,  
                TerminationDate = dtoData.Emp.TerminationDate,  
                Occupation = dtoData.Emp.Occupation, 
                Compensation = dtoData.Emp.Compensation, 
                EmployeeNumber = dtoData.Emp.EmployeeNumber,  
                Smoker = dtoData.Emp.Smoker,  
                COB = dtoData.Emp.COB,  
                MailCompany  = dtoData.Emp.MailCompany, 
                EFT = dtoData.Emp.EFT,  
                Evidence = dtoData.Emp.Evidence,
                DependentCoverage  = dtoData.Emp.DependentCoverage,
                PolicyNumber = dtoData.Emp.PolicyNumber, 
                InsuranceCompany = dtoData.Emp.InsuranceCompany, 
                GenderId = dtoData.Emp.GenderId, 
                MaritalStatusId = dtoData.Emp.MaritalStatusId, 
                CountryId = dtoData.Emp.CountryId, 
                ClassId = dtoData.Emp.ClassId, 
                DivisionId = dtoData.Emp.DivisionId, 
                CompanyId = dtoData.Emp.CompanyId, 
                ProvinceId = dtoData.Emp.ProvinceId,
                ProvinceName = dtoData.Emp.Province.Name,
                CompensationTypeId = dtoData.Emp.CompensationTypeId,
                CompanyName = dtoData.Comp.CompanyName
            });

            return await query.SingleOrDefaultAsync();
        }

        public async Task<PagedList<EmployeeDto>> GetEmployeesAsync(UserParams userParams)
        {

            var query = _context.Employee
            .Join(_context.Company,
                emp=>emp.CompanyId,
                comp=>comp.Id,
                (emp,comp) => new { Comp = comp, Emp = emp })
            .Select(dtoData => new EmployeeDto {
                Id = dtoData.Emp.Id,
                SIN = dtoData.Emp.SIN,
                FirstName = dtoData.Emp.FirstName,
                LastName = dtoData.Emp.LastName,
                MiddleName = dtoData.Emp.MiddleName, 
                BirthDate = dtoData.Emp.Birthdate,  
                Address = dtoData.Emp.Address,
                City = dtoData.Emp.City,
                PostalCode = dtoData.Emp.PostalCode,
                PhoneNumber = dtoData.Emp.PhoneNumber,
                EmailAddress = dtoData.Emp.EmailAddress, 
                EligibilityDate = dtoData.Emp.EligibilityDate,  
                HireDate = dtoData.Emp.HireDate,  
                StartDate = dtoData.Emp.StartDate,  
                TerminationDate = dtoData.Emp.TerminationDate,  
                Occupation = dtoData.Emp.Occupation, 
                Compensation = dtoData.Emp.Compensation, 
                EmployeeNumber = dtoData.Emp.EmployeeNumber,  
                Smoker = dtoData.Emp.Smoker,  
                COB = dtoData.Emp.COB,  
                MailCompany  = dtoData.Emp.MailCompany, 
                EFT = dtoData.Emp.EFT,  
                Evidence = dtoData.Emp.Evidence,
                DependentCoverage  = dtoData.Emp.DependentCoverage,
                PolicyNumber = dtoData.Emp.PolicyNumber, 
                InsuranceCompany = dtoData.Emp.InsuranceCompany, 
                GenderId = dtoData.Emp.GenderId, 
                MaritalStatusId = dtoData.Emp.MaritalStatusId, 
                CountryId = dtoData.Emp.CountryId, 
                ClassId = dtoData.Emp.ClassId, 
                DivisionId = dtoData.Emp.DivisionId, 
                CompanyId = dtoData.Emp.CompanyId, 
                ProvinceId = dtoData.Emp.ProvinceId,
                ProvinceName = dtoData.Emp.Province.Name,
                CompensationTypeId = dtoData.Emp.CompensationTypeId,
                CompanyName = dtoData.Comp.CompanyName
            });

            if (!string.IsNullOrEmpty(userParams.Filter)){
                if (userParams.FilterBy == "Last Name") {
                    query = query.Where(x=>x.LastName.ToUpper().StartsWith(userParams.Filter.ToUpper()));  
                } else  if (userParams.FilterBy == "First Name") {
                    query = query.Where(x=>x.FirstName.ToUpper().StartsWith(userParams.Filter.ToUpper()));  
                } else  {
                    query = query.Where(x=>x.CompanyName.ToUpper().StartsWith(userParams.Filter.ToUpper()));  
                }               
            }

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<EmployeeDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Employee employee)
        {
            throw new System.NotImplementedException();
        }
    }
}