using System.Collections.Generic;
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
            var query = _context.Province.Join(_context.Tax_Type,
                prov=>prov.TaxTypeId,
                tax=>tax.Id,
                (prov,tax) => new { Prov=prov, Tax=tax}
            ).Select(dtoData => new ProvinceDto {
                Id = dtoData.Prov.Id,
                Name = dtoData.Prov.Name,
                TaxTypeId = dtoData.Tax.Id,
                TaxTypeName = dtoData.Tax.Type,
                TaxPercentage = dtoData.Prov.TaxPercentage,
            });

            return await query.ToListAsync();
        }
        
        public async Task<IEnumerable<FederalTaxDto>> GetFederalTaxesAsync()
        {
            var query = _context.Federal_Tax.Join(_context.Tax_Type,
                fed=>fed.TaxTypeId,
                tax=>tax.Id,
                (fed,tax) => new { Fed=fed, Tax=tax}
            ).Select(dtoData => new FederalTaxDto {
                Id = dtoData.Fed.Id,
                TaxTypeName = dtoData.Tax.Type,
                TaxPercentage = dtoData.Fed.TaxPercentage,
            });

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<TaxTypeDto>> GetTaxTypesAsync()
        {
            var query =  _context.Tax_Type
            .ProjectTo<TaxTypeDto>(_mapper.ConfigurationProvider)
            .AsNoTracking();

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<GenderDto>> GetGendersAsync()
        {
            var query =  _context.Gender
            .Select(dtoData => new GenderDto {
                Id = dtoData.Id,
                Name= dtoData.Type
            });
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<MaritalStatusDto>> GetMaritalStatusesAsync()
        {
            var query =  _context.Marital_Status
            .Select(dtoData => new MaritalStatusDto {
                Id = dtoData.Id,
                Name= dtoData.Type
            });
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<HsaAccountTypeDto>> GetHsaAccountTypes()
        {
            var query = _context.Hsa_Account_Type
            .Select(dtoData => new HsaAccountTypeDto {
                Id = dtoData.Id,
                Name= dtoData.Type
            });

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<CompensationTypeDto>> GetCompensationTypesAsync()
        {
            var query = _context.Compensation_Type
            .Select(dtoData => new CompensationTypeDto {
                Id = dtoData.Id,
                Name= dtoData.Type
            });

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<DependentRelationshipTypeDto>> GetDependentRelationshipTypesAsync()
        {
            var query = _context.Dependent_Relationship_Type
            .Select(dtoData => new DependentRelationshipTypeDto {
                Id = dtoData.Id,
                Name= dtoData.Type
            });

            return await query.ToListAsync();
        }
    }
}