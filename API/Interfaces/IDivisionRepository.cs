using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IDivisionRepository
    {
        void Update(Division division);
        Task<bool> SaveAllAsync();
        Task<PagedList<DivisionDto>> GetDivisionsAsync(UserParams userParams, int companyId);
        Task<DivisionDto> GetDivisionByIdAsync(int id);
        void Add(Division division);
        Task<bool> DivisionExists(string divisionName, int companyId);
    }
}