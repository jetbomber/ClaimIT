using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class ClassDto
    {
        public int Id { get; set; }
        [Required]
        public int ClassNumber { get; set; }
        [Required]
        public string ClassName { get; set; }
        public string Description { get; set; }
        [Required]
        public int ClassWaitingPeriod { get; set; }
        [Required]
        public double PersonalHealthMaximum { get; set; }
        public bool IsHsaClass { get; set; }
        public int CompanyId { get; set; }
        public ICollection<HsaClassDetailsDto> HsaClassDetails { get; set; }
    }
}