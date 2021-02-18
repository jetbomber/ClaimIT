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
using System.Collections.Generic;

namespace API.Data
{
    public class ClassRepository: IClassRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ClassRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public bool Add(Class classData, out int classId)
        {
            _context.Class.Add(classData);
            bool addStatus = _context.SaveChanges() > 0; 
            classId = classData.Id;
            return addStatus;
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

        public async Task<IEnumerable<ClassListDto>> GetClassListForCompany(int companyId)
        {
            var query =  _context.Class
            .Where(x=>x.CompanyId == companyId)
            .Select(dtoData => new ClassListDto {
                Id = dtoData.Id,
                Name= dtoData.ClassName
            });
            return await query.ToListAsync();
        }

        public async Task<PagedList<ClassDto>> GetClassesAsync(UserParams userParams, int companyId)
        {
            IQueryable<ClassDto> query = _context.Class
            .ProjectTo<ClassDto>(_mapper.ConfigurationProvider)
            .Where(x=>x.CompanyId==companyId);
            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.ClassName.ToUpper().Contains(userParams.Filter.ToUpper()));
            }

            query.Join(_context.Hsa_Class_Details,
            cls=>cls.Id,
            details=>details.ClassId,
            (cls,details) => new { DETAILS = details })
            .Select(s=> new {
                HsaClassDetailsId = s.DETAILS.Id
            });

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<ClassDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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