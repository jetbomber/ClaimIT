using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HsaClassDetailsRepository : IHsaClassDetailsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HsaClassDetailsRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public void Add(HsaClassDetails hsaClassDetails)
        {
            throw new System.NotImplementedException();
        }

        public async Task<HsaClassDetailsDto> GetHsaClassDetailsByClassIdAsync(int classId)
        {
            IQueryable<HsaClassDetailsDto> query = _context.Hsa_Class_Details
            .ProjectTo<HsaClassDetailsDto>(_mapper.ConfigurationProvider)
            .Where(x => x.ClassId == classId);

            query.Join(_context.Hsa_Account_Type,
            details=>details.HsaAccountTypeId,
            accountType=>accountType.Id,
            (details,accountType) => new { ACCOUNTTYPE = accountType });

            return await query.SingleOrDefaultAsync();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(HsaClassDetails hsaClassDetails)
        {
            throw new System.NotImplementedException();
        }
    }
}