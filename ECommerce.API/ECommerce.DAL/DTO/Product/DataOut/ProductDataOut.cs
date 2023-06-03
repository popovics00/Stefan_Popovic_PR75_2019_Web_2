using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.DTO.Product.DataOut
{
    public class ProductDataOut
    {
        public string Name { get; set; }
        public int? Id { get; set; }
        public double? Price { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }
        public string CategoryName { get; set; }
        public string Images { get; set; }

        public ProductDataOut()
        {
        }

        public ProductDataOut(ECommerce.DAL.Models.Product product)
        {
            Name = product?.Name;
            Id = product?.Id;
            Price = product?.Price;
            Description = product?.Description;
            CategoryName = product?.Category?.Name;
        }
    }
}
