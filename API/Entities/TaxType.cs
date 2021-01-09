using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Tax_Type")]
    public class TaxType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<Province> Provinces { get; set; }
    }
}