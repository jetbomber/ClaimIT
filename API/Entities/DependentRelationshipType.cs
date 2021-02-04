using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Dependent_Relationship_Type")]
    public class DependentRelationshipType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<Dependent> Dependents { get; set; }
    }
}