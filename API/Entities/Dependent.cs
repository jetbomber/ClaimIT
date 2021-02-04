using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Dependent")]
    public class Dependent
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthdate  { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public Gender Gender { get; set; }
        public int GenderId { get; set; }
        public DependentRelationshipType DependentRelationshipType { get; set; }
        public int DependentRelationshipTypeId { get; set; }
    }
}