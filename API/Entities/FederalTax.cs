namespace API.Entities
{
    public class FederalTax
    {
        public int Id { get; set; }
        public double TaxPercentage { get; set; }
        public TaxType TaxType { get; set; }
        public int TaxTypeId { get; set; }
    }
}