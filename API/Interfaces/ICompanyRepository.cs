using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICompanyRepository
    {
        void Update(Company company);
        Task<bool> SaveAllAsync();
        Task<PagedList<Company>> GetCompaniesAsync(UserParams userParams);
        Task<Company> GetCompanyByIdAsync(int id);
        void Add(Company company);
        Task<bool> CompanyExists(string companyName);
        
    }
}