using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.DTO.Order.DataIn
{
    public class OrderDataIn
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string PaymentMethod { get; set; }
        public string DeliveryMethod { get; set; }
        public List<CartItemDataIn> CartItems { get; set; }
    }
    public class CartItemDataIn
    {
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
        public string Images { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int Count { get; set; }
    }
}
