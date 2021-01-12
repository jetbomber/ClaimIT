namespace API.DTOs
{
    public class DivisionDto
    {
         public int Id { get; set; }
        public int DivisionNumber { get; set; }
        public string DivisionName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonPhoneNumber { get; set; }
        public string ContactPersonPhoneNumberExt { get; set; }
        public string ContactPersonEmailAddress { get; set; }
        public string ContactPersonFax { get; set; }
        public double GeneralAdminFee { get; set; }
        public int CompanyId { get; set; }
        public int ProvinceId { get; set; }
        
    }
}