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
        public bool Add(HsaClassDetails hsaClassDetails,out int hsaClassDetailId)
        {
            _context.Hsa_Class_Details.Add(hsaClassDetails);
            bool addStatus = _context.SaveChanges() > 0; 
            hsaClassDetailId = hsaClassDetails.Id;
            return addStatus;
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

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Delete(HsaClassDetails hsaClassDetails)
        {
            _context.Entry(hsaClassDetails).State = EntityState.Deleted;
        }

        public void Update(HsaClassDetails hsaClassDetails)
        {
            _context.Entry(hsaClassDetails).State = EntityState.Modified;
        }
    }
}