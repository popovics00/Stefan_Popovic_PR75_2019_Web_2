﻿using ECommerce.DAL.DTO.Order.DataIn;

namespace ECommerce.DAL.Models
{
    public class Order : Entity
    {
        public int? CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }

    }
    public class OrderItem
    {
        public int? OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }

    }
}