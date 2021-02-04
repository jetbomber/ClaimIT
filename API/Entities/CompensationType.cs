using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Compensation_Type")]
    public class CompensationType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}