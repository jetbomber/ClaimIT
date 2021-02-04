using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    
    public interface IHsaClassDetailsRepository
    {
        void Update(HsaClassDetails hsaClassDetails);
        Task<bool> SaveAllAsync();
        Task<HsaClassDetailsDto> GetHsaClassDetailsByClassIdAsync(int classId);
        void Add(HsaClassDetails hsaClassDetails);
    }
}