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
        public static async Task SeedFederalTax(DataContext context)
        {
            if (await context.Federal_Tax.AnyAsync()) return;

            var federalTaxData = await System.IO.File.ReadAllTextAsync("Data/FederalTaxSeedData.json");
            var federalTaxes = JsonSerializer.Deserialize<List<FederalTax>>(federalTaxData);

            foreach (var federalTax in federalTaxes)
            {
                context.Federal_Tax.Add(federalTax);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedMaritalStatus(DataContext context)
        {
            if (await context.Marital_Status.AnyAsync()) return;

            var maritalStatusData = await System.IO.File.ReadAllTextAsync("Data/MaritalStatusSeedData.json");
            var maritalStatuses = JsonSerializer.Deserialize<List<MaritalStatus>>(maritalStatusData);

            foreach (var maritalStatus in maritalStatuses)
            {
                context.Marital_Status.Add(maritalStatus);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedGender(DataContext context)
        {
            if (await context.Gender.AnyAsync()) return;

            var genderData = await System.IO.File.ReadAllTextAsync("Data/GenderSeedData.json");
            var genders = JsonSerializer.Deserialize<List<Gender>>(genderData);

            foreach (var gender in genders)
            {
                context.Gender.Add(gender);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedDependentRelationshipTypes(DataContext context)
        {
            if (await context.Dependent_Relationship_Type.AnyAsync()) return;

            var dependentRelationshipTypeData = await System.IO.File.ReadAllTextAsync("Data/DependentRelationshipSeedData.json");
            var dependentRelationshipTypes = JsonSerializer.Deserialize<List<DependentRelationshipType>>(dependentRelationshipTypeData);

            foreach (var dependentRelationshipType in dependentRelationshipTypes)
            {
                context.Dependent_Relationship_Type.Add(dependentRelationshipType);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedCompensationTypes(DataContext context)
        {
            if (await context.Compensation_Type.AnyAsync()) return;

            var compensationTypeData = await System.IO.File.ReadAllTextAsync("Data/CompensationTypeSeedData.json");
            var compensationTypes = JsonSerializer.Deserialize<List<CompensationType>>(compensationTypeData);

            foreach (var compensationType in compensationTypes)
            {
                context.Compensation_Type.Add(compensationType);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedCountries(DataContext context)
        {
            if (await context.Country.AnyAsync()) return;

            var countryData = await System.IO.File.ReadAllTextAsync("Data/CountrySeedData.json");
            var countries = JsonSerializer.Deserialize<List<Country>>(countryData);

            foreach (var country in countries)
            {
                context.Country.Add(country);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedEmployees(DataContext context)
        {
            if (await context.Employee.AnyAsync()) return;

            var employeeData = await System.IO.File.ReadAllTextAsync("Data/EmployeeSeedData.json");
            var employees = JsonSerializer.Deserialize<List<Employee>>(employeeData);

            foreach (var employee in employees)
            {
                context.Employee.Add(employee);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedDependents(DataContext context)
        {
            if (await context.Dependent.AnyAsync()) return;

            var dependentData = await System.IO.File.ReadAllTextAsync("Data/DependentSeedData.json");
            var dependents = JsonSerializer.Deserialize<List<Dependent>>(dependentData);

            foreach (var dependent in dependents)
            {
                context.Dependent.Add(dependent);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedHsaAccountTypes(DataContext context)
        {
            if (await context.Hsa_Account_Type.AnyAsync()) return;

            var hsaAccountTypeData = await System.IO.File.ReadAllTextAsync("Data/HsaAccountTypeSeedData.json");
            var hsaAccountTypes = JsonSerializer.Deserialize<List<HsaAccountType>>(hsaAccountTypeData);

            foreach (var hsaAccountType in hsaAccountTypes)
            {
                context.Hsa_Account_Type.Add(hsaAccountType);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedHsaClassDetails(DataContext context)
        {
            if (await context.Hsa_Class_Details.AnyAsync()) return;

            var hsaClassDetailsData = await System.IO.File.ReadAllTextAsync("Data/HsaClassDetailsSeedData.json");
            var hsaClassDetails = JsonSerializer.Deserialize<List<HsaClassDetails>>(hsaClassDetailsData);

            foreach (var hsaClassDetail in hsaClassDetails)
            {
                context.Hsa_Class_Details.Add(hsaClassDetail);
            }

            await context.SaveChangesAsync();
        }
    }
}