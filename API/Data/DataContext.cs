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
    }
}