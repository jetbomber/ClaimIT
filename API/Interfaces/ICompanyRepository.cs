using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICompanyRepository
    {
        void Update(Company company);
        Task<bool> SaveAllAsync();
        Task<PagedList<CompanyDto>> GetCompaniesAsync(UserParams userParams);
        Task<CompanyDto> GetCompanyByIdAsync(int id);
        
    }
}