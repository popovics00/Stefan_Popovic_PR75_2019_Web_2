using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models.Models
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
        public Role Role { get; set; }

    }
    public enum Role
    {
        Customer = 1,
        Saler = 2,
        Admin = 3,
    }
}