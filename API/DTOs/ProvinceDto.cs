using API.Entities;

namespace API.DTOs
{
    public class ProvinceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double TaxPercentage { get; set; }
        public int TaxTypeId { get; set; }
        public string TaxTypeName{ get; set; }
        
    }
}