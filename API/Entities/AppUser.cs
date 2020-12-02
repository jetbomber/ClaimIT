using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("User")]
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public bool IsActive { get; set; }
    }
}