using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Marital_Status")]
    public class MaritalStatus
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}