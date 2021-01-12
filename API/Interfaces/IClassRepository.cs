using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IClassRepository
    {
        void Update(Class classData);
        Task<bool> SaveAllAsync();
        Task<PagedList<Class>> GetClassesAsync(UserParams userParams);
        Task<Class> GetClassByIdAsync(int id);
        void Add(Class classData);
        Task<bool> ClassExists(string className, int companyId);
    }
}