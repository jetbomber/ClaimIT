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
        bool Add(HsaClassDetails hsaClassDetails,out int hsaClassDetailId);
        void Delete(HsaClassDetails hsaClassDetails);
    }
}