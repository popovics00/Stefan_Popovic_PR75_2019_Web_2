using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models.Models
{
    public class Product : Entity
    {
        [Required]
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }

    }
}