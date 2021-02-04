using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IClassRepository
    {
        void Update(Class classData);
        Task<bool> SaveAllAsync();
        Task<PagedList<ClassDto>> GetClassesAsync(UserParams userParams,int companyId);
        Task<Class> GetClassByIdAsync(int id);
        void Add(Class classData);
        Task<bool> ClassExists(string className, int companyId);
    }
}