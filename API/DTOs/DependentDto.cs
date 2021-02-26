using System;

namespace API.DTOs
{
    public class DependentDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate  { get; set; }
        public int EmployeeId { get; set; }
        public int GenderId { get; set; }
        public int DependentRelationshipTypeId { get; set; }
        public string DependentRelationshipTypeName { get; set; }
    }
}