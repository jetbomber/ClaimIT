using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IDependentRepository
    {
        void Update(Dependent dependent);
        Task<bool> SaveAllAsync();
        Task<PagedList<DependentDto>> GetDependentsAsync(UserParams userParams, int employeeId);
        Task<IEnumerable<DependentListDto>> GetDependentList(int employeeId);
        Task<DependentDto> GetDependentByIdAsync(int id);
        void Add(Dependent dependent);
        Task<bool> DependentExists(Dependent dependent);
    }
}