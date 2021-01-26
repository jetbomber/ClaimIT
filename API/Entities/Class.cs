using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Class")]
    public class Class
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
        public Company Company { get; set; }
        public int CompanyId { get; set; }

    }
}