using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Employee")]
    public class Employee
    {
        public int Id { get; set; }
        public string SIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime Birthdate  { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public DateTime EligibilityDate  { get; set; }
        public DateTime HireDate  { get; set; }
        public DateTime StartDate  { get; set; }
        public DateTime? TerminationDate  { get; set; }
        public string Occupation { get; set; }
        public double Compensation { get; set; }
        public string EmployeeNumber { get; set; }
        public bool Smoker { get; set; }
        public bool COB { get; set; }
        public bool MailCompany { get; set; }
        public bool EFT { get; set; }
        public bool Evidence { get; set; }
        public bool DependentCoverage { get; set; }
        public string PolicyNumber { get; set; }
        public string InsuranceCompany { get; set; }
        public Gender Gender { get; set; }
        public int GenderId { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public int MaritalStatusId { get; set; }
        public Country Country { get; set; }
        public int CountryId { get; set; }
        public Class Class { get; set; }
        public int ClassId { get; set; }
        public Division Division { get; set; }
        public int DivisionId { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }
        public Province Province { get; set; }
        public int ProvinceId { get; set; }
        public CompensationType CompensationType { get; set; }
        public int CompensationTypeId { get; set; }
        public ICollection<Dependent> Dependents { get; set; }
    }
}