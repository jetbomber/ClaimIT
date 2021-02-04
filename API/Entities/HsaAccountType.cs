using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Hsa_Account_Type")]
    public class HsaAccountType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<HsaClassDetails> HsaClassDetails { get; set; }
    }
}