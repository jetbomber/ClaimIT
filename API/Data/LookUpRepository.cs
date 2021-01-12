using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LookUpRepository : ILookUpRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LookUpRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<IEnumerable<ProvinceDto>> GetProvincesAsync()
        {
             return await _context.Province.ProjectTo<ProvinceDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}