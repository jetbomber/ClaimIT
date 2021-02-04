namespace API.DTOs
{
    public class HsaClassDetailsDto
    {
        public int Id { get; set; }
        public int CarryForwardYears { get; set; }
        public bool ExcludeDental { get; set; }
        public bool ExcludeDrug { get; set; }
        public bool ExcludeExtendedHealth { get; set; }
        public bool ExcludeVision { get; set; }
        public int ClassId { get; set; }
        public int HsaAccountTypeId { get; set; }
    }
}