using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models.Models
{
    public class Category : Entity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

    }
}