using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.User.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.User.Add(user);

            }

            await context.SaveChangesAsync();

        }

        public static async Task SeedCompanies(DataContext context)
        {
            if (await context.Company.AnyAsync()) return;

            var companyData = await System.IO.File.ReadAllTextAsync("Data/CompanySeedData.json");
            var companies = JsonSerializer.Deserialize<List<Company>>(companyData);

            foreach (var company in companies)
            {
                context.Company.Add(company);
            }

            await context.SaveChangesAsync();

        }
    }
}