using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Gender")]
    public class Gender
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<Dependent> Dependents { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}