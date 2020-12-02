using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class CompanyDto {        
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public DateTime YearEndDate { get; set; }
        public DateTime GroupTerminationDate { get; set; }
        public DateTime CommencementDate { get; set; }
        public bool IncludeHsaClaims { get; set; }
        public bool IncludeCostPlusClaims { get; set; }
    }
}