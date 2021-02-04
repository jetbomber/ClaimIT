using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ClassDto
    {
        public int Id { get; set; }
        public int ClassNumber { get; set; }
        public string ClassName { get; set; }
        public string Description { get; set; }
        public int ClassWaitingPeriod { get; set; }
        public double PersonalHealthMaximum { get; set; }
        public bool IsHsaClass { get; set; }
        public int CompanyId { get; set; }
        public ICollection<HsaClassDetailsDto> HsaClassDetails { get; set; }
    }
}