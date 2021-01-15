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
    }
}