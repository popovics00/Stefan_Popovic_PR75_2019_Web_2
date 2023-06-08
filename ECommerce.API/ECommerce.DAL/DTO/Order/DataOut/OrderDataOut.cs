using ECommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.DTO.Order.DataOut
{
    public class OrderDataOut
    {
        public int? CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }
        public double Total { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDataOut> OrderItems { get; set; }
        public string Status { get; set; }

    }
    public class OrderItemDataOut
    {
        public int? OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int Quantity { get; set; }

        public OrderItemDataOut(OrderItem x)
        {
            OrderId = x.OrderId;
            ProductId = x.ProductId;
            Quantity = x.Quantity;
            ProductName = x.Product != null ? x.Product.Name : "";
            ProductPrice = x.Product != null ? x.Product.Price : 0;
        }
    }

}
