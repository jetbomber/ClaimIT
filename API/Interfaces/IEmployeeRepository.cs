using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IEmployeeRepository
    {
        void Update(Employee employee);
        Task<bool> SaveAllAsync();
        Task<PagedList<EmployeeDto>> GetEmployeesAsync(UserParams userParams);
        Task<Employee> GetEmployeeByIdAsync(int id);
        bool Add(Employee employee);
        Task<bool> EmployeeExists(string SIN, int companyId);
    }
}