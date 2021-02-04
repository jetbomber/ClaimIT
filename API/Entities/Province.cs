using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Province")]
    public class Province
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; }
        [Required] public double TaxPercentage { get; set; }
        public TaxType TaxType { get; set; }
        public int TaxTypeId { get; set; }
        public ICollection<Division> Divisions { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}