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
        Task<EmployeeDto> GetEmployeeByIdAsync(int employeeId);
        void Add(Employee employee);
        Task<bool> EmployeeExists(string SIN);
    }
}