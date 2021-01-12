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

        public static async Task SeedTaxTypes(DataContext context)
        {
            if (await context.Tax_Type.AnyAsync()) return;

            var taxTypeData = await System.IO.File.ReadAllTextAsync("Data/TaxTypeSeedData.json");
            var taxTypes = JsonSerializer.Deserialize<List<TaxType>>(taxTypeData);

            foreach (var taxType in taxTypes)
            {
                context.Tax_Type.Add(taxType);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedProvinces(DataContext context)
        {
            if (await context.Province.AnyAsync()) return;

            var provinceData = await System.IO.File.ReadAllTextAsync("Data/ProvinceSeedData.json");
            var provinces = JsonSerializer.Deserialize<List<Province>>(provinceData);

            foreach (var province in provinces)
            {
                context.Province.Add(province);
            }

            await context.SaveChangesAsync();
        }
        
        public static async Task SeedDivisions(DataContext context)
        {
            if (await context.Division.AnyAsync()) return;

            var divisionData = await System.IO.File.ReadAllTextAsync("Data/DivisionSeedData.json");
            var divisions = JsonSerializer.Deserialize<List<Division>>(divisionData);

            foreach (var division in divisions)
            {
                context.Division.Add(division);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedClasses(DataContext context)
        {
            if (await context.Class.AnyAsync()) return;

            var classData = await System.IO.File.ReadAllTextAsync("Data/ClassSeedData.json");
            var classes = JsonSerializer.Deserialize<List<Class>>(classData);

            foreach (var classElement in classes)
            {
                context.Class.Add(classElement);
            }

            await context.SaveChangesAsync();
        }
    }
}