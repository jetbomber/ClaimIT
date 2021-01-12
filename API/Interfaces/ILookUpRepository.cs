using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface ILookUpRepository
    {
        Task<IEnumerable<ProvinceDto>> GetProvincesAsync();
    }
}