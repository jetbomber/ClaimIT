using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DependentRepository : IDependentRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DependentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public void Add(Dependent dependent)
        {
            _context.Add(dependent).State = EntityState.Added;
        }

        public async Task<bool> DependentExists(Dependent dependent)
        {
             return await _context.Dependent
            .Where(x => x.FirstName == dependent.FirstName)
            .Where(x => x.LastName == dependent.LastName)
            .Where(x=> x.EmployeeId == dependent.EmployeeId)
            .CountAsync() > 0;
        }

        public Task<DependentDto> GetDependentByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<DependentListDto>> GetDependentList(int employeeId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<DependentDto>> GetDependentsAsync(UserParams userParams, int employeeId)
        {
            var query = _context.Dependent
            .Where(x=>x.EmployeeId == employeeId)
            .Join(_context.Dependent_Relationship_Type,
            dep=>dep.DependentRelationshipTypeId,
            rel=>rel.Id,
            (dep,rel) => new { Rel = rel, Dep = dep })
            .Select(dtoData=> new DependentDto {
                Id = dtoData.Dep.Id,
                FirstName = dtoData.Dep.FirstName, 
                LastName = dtoData.Dep.LastName, 
                BirthDate = dtoData.Dep.Birthdate,  
                EmployeeId = dtoData.Dep.EmployeeId, 
                GenderId  = dtoData.Dep.GenderId,
                DependentRelationshipTypeId = dtoData.Dep.DependentRelationshipTypeId,
                DependentRelationshipTypeName = dtoData.Rel.Type
            });

            if (!string.IsNullOrEmpty(userParams.Filter)){
                query = query.Where(x=>x.FirstName.ToUpper().Contains(userParams.Filter.ToUpper()));               
            }

            query = SortingExtension.SortBy(query,userParams.SortColumn,userParams.Reverse);

            return await PagedList<DependentDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Dependent dependent)
        {
            _context.Entry(dependent).State = EntityState.Modified;
        }
    }
}