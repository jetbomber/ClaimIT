using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Hsa_Class_Details")]
    public class HsaClassDetails
    {
        public int Id { get; set; }
        public int CarryForwardYears { get; set; }
        public bool ExcludeDental { get; set; }
        public bool ExcludeDrug { get; set; }
        public bool ExcludeExtendedHealth { get; set; }
        public bool ExcludeVision { get; set; }
        public Class Class { get; set; }
        public int ClassId { get; set; }
        public HsaAccountType HsaAccountType { get; set; }
        public int HsaAccountTypeId { get; set; }
    }
}