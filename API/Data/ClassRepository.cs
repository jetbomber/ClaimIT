using API.Extensions;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ClassRepository: IClassRepository
    {
        private readonly DataContext _context;
        public ClassRepository(DataContext context)
        {
            _context = context;

        }
        public void Add(Class classData)
        {
            _context.Add(classData).State = EntityState.Added;
        }

        public async Task<bool> ClassExists(string className, int companyId)
        {
            return await _context.Class
            .Where(x => x.ClassName == className)
            .Where(x=> x.CompanyId == companyId )
            .CountAsync() > 0;
        }

        public async Task<Class> GetClassByIdAsync(int id)
        {
            return await _context.Class
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }

        public async Task<PagedList<Class>> GetClassesAsync(UserParams userParams)
        {
            IQueryable<Class> query = _context.Class;
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.ClassName.ToUpper().Contains(userParams.Filter.ToUpper()));
            }

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<Class>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Class classData)
        {
            _context.Entry(classData).State = EntityState.Modified;
        }
    }
}