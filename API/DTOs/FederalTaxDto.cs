namespace API.DTOs
{
    public class FederalTaxDto
    {
        public int Id { get; set; }
        public double TaxPercentage { get; set; }
        public string TaxTypeName { get; set; }
    }
}