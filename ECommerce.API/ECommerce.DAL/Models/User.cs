using System.ComponentModel.DataAnnotations;

namespace ECommerce.DAL.Models
{
    public class User : Entity
    {
        [Required]
        public string Address { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string UserName { get; set; }
        public Role Role { get; set; }
        public bool Active { get; set; } = false;
        public string ActivateKey { get; set; }
    }
    public enum Role
    {
        Customer = 1,
        Saler = 2,
        Admin = 3,
    }
}