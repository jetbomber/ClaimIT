using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Company")]
    public class Company
    {
        public int Id { get; set; }
        [Required] public string CompanyName { get; set; }
        [Required] public DateTime YearEndDate { get; set; }
        public DateTime? GroupTerminationDate { get; set; }
        [Required] public DateTime CommencementDate { get; set; }
        public bool IncludeHsaClaims { get; set; }
        public bool IncludeCostPlusClaims { get; set; }
        public ICollection<Division> Divisions { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}