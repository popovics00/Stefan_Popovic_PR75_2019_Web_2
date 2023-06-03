using ECommerce.DAL.DTO.Product.DataIn;
using Microsoft.Identity.Client;
using Org.BouncyCastle.Crypto.Digests;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.DAL.Models
{
    public class Product : Entity
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; } = 0;
        public string Description { get; set; }
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        public string? Images{ get; set; }

       
    }
}