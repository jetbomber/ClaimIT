using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Division")]
    public class Division
    {
        public int Id { get; set; }
        [Required]
        public int DivisionNumber { get; set; }
        [Required]
        public string DivisionName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string ContactPersonName { get; set; }
        public string ContactPersonPhoneNumber { get; set; }
        public string ContactPersonPhoneNumberExt { get; set; }
        [Required]
        public string ContactPersonEmailAddress { get; set; }
        public string ContactPersonFax { get; set; }
        [Required]
        public double GeneralAdminFee { get; set; }
        public Company Company { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public Province Province { get; set; }
        [Required]
        public int ProvinceId { get; set; }

    }
}