using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILookUpRepository
    {
        Task<IEnumerable<ProvinceDto>> GetProvincesAsync();
        Task<IEnumerable<TaxTypeDto>> GetTaxTypesAsync();
        Task<IEnumerable<FederalTaxDto>> GetFederalTaxesAsync();
        Task<IEnumerable<HsaAccountTypeDto>> GetHsaAccountTypes();
        Task<IEnumerable<GenderDto>> GetGendersAsync();
        Task<IEnumerable<MaritalStatusDto>> GetMaritalStatusesAsync();
        Task<IEnumerable<CompensationTypeDto>> GetCompensationTypesAsync();
    }
}