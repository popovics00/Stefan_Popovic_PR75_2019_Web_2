using ECommerce.DAL.DTO.Product.DataIn;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;
using Org.BouncyCastle.Crypto.Digests;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
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

        public async Task<string> SaveImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                string imagePath = Path.Combine("C:\\Users\\stefa\\OneDrive\\Desktop\\Stefan_Popovic_PR75_2019_Web_2\\Stefan_Popovic_PR75_2019_Web_2\\ECommerce.API\\Products\\ECommerce.Product\\save\\images", uniqueFileName);

                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                //return imagePath;
                return "http://127.0.0.1:8887/"+uniqueFileName;
            }

            return null;
        }
    }
}