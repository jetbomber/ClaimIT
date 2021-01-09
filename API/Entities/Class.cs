using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Class")]
    public class Class
    {
        public int Id { get; set; }
        public int ClassNumber { get; set; }
        public string ClassName { get; set; }
        public string Description { get; set; }
        public int ClassWaitingPeriod { get; set; }
        public double PersonalHealthMaximum { get; set; }
        public bool IsHsaClass { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }

    }
}