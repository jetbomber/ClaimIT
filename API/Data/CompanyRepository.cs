using API.Extensions;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CompanyRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<PagedList<Company>> GetCompaniesAsync(UserParams userParams)
        {
            
            IQueryable<Company> query = _context.Company
            .AsNoTracking();
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.CompanyName.ToUpper().Contains(userParams.Filter.ToUpper()));
            }

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<Company>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
        {
            return await _context.Company
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }

        public async Task<bool> CompanyExists(string companyName)
        {
            return await _context.Company
            .Where(x => x.CompanyName == companyName)
            .CountAsync() > 0;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Company company)
        {
            _context.Entry(company).State = EntityState.Modified;
        }

        public void Add(Company company)
        {
            _context.Add(company).State = EntityState.Added;
        }
    }
}