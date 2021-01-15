using API.Extensions;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class DivisionRepository : IDivisionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DivisionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public void Add(Division division)
        {
            _context.Add(division).State = EntityState.Added;
        }

        public async Task<bool> DivisionExists(string divisionName, int companyId)
        {
            return await _context.Division
            .Where(x => x.DivisionName == divisionName)
            .Where(x=> x.CompanyId == companyId )
            .CountAsync() > 0;
        }

        public async Task<DivisionDto> GetDivisionByIdAsync(int divisionId)
        {

            IQueryable<DivisionDto> query = _context.Division
            .ProjectTo<DivisionDto>(_mapper.ConfigurationProvider)
            .Where(x => x.Id == divisionId);

            query.Join(_context.Province,
            div=>div.ProvinceId,
            prov=>prov.Id,
            (div,prov) => new { Prov = prov })
            .Select(s=> new {
                ProvinceName = s.Prov.Name
            });

            return await query.SingleOrDefaultAsync();
        }

        public async Task<PagedList<DivisionDto>> GetDivisionsAsync(UserParams userParams, int companyId)
        {

            IQueryable<DivisionDto> query = _context.Division
            .Where(x=>x.CompanyId==companyId)
            .ProjectTo<DivisionDto>(_mapper.ConfigurationProvider)
            .AsNoTracking();
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.DivisionName.ToUpper().Contains(userParams.Filter.ToUpper()));               
            }

            query.Join(_context.Province,
            div=>div.ProvinceId,
            prov=>prov.Id,
            (div,prov) => new { Prov = prov })
            .Select(s=> new {
                ProvinceName = s.Prov.Name
            });

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<DivisionDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Division division)
        {
            _context.Entry(division).State = EntityState.Modified;
        }
    }
}