using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> User { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Province> Province { get; set; }
        public DbSet<TaxType> Tax_Type { get; set; }
        public DbSet<Division> Division { get; set; }
        public DbSet<Class> Class { get; set; }
        public DbSet<FederalTax> Federal_Tax { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<CompensationType> Compensation_Type { get; set; }
        public DbSet<Country> Country{ get; set; }
        public DbSet<Dependent> Dependent{ get; set; }
        public DbSet<DependentRelationshipType> Dependent_Relationship_Type{ get; set; }
        public DbSet<Gender> Gender{ get; set; }
        public DbSet<MaritalStatus> Marital_Status{ get; set; }
        public DbSet<HsaAccountType> Hsa_Account_Type{ get; set; }
        public DbSet<HsaClassDetails> Hsa_Class_Details{ get; set; }
    }
}