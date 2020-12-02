using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public async Task<PagedList<CompanyDto>> GetCompaniesAsync(UserParams userParams)
        {
            
            var query = _context.Company
            .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
            .AsNoTracking();
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.CompanyName.ToUpper().Contains(userParams.Filter.ToUpper()));
            }
            if(userParams.SortDirection.ToUpper() == "DESC") {
                query = query.OrderByDescending(x=>x.CompanyName);
            } else {
                query = query.OrderBy(x=>x.CompanyName);
            }
            return await PagedList<CompanyDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<CompanyDto> GetCompanyByIdAsync(int id)
        {
             return await _context.Company
            .Where(x => x.Id == id)
            .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Company company)
        {
            _context.Entry(company).State = EntityState.Modified;
        }
    }
}