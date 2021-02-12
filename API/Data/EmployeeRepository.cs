using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
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

        public Task<Employee> GetEmployeeByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<Employee>> GetEmployeesAsync(UserParams userParams)
        {
            IQueryable<Employee> query = _context.Employee
            .AsNoTracking();
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.LastName.ToUpper().Contains(userParams.Filter.ToUpper()));
            }

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<Employee>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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